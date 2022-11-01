import bcrypt from 'bcryptjs';

import UserModal from '../models/user.js';
import SessionModal from '../models/session.js';

import { generateToken } from '../other/token.js';
import { cleanupAddress } from '../other/ip.js';

export const signup = async (req, res) => {

	try {

		const { username, password } = req.body;
		
		const user = await UserModal.findOne({ username });
		if (user) return res.status(400).json({ message: "Username already belongs to an existing user." });
		
		const hashedPassword = await bcrypt.hash(password, 11);
		await UserModal.create({ username, password: hashedPassword });
		
		return res.status(200).json({ message: "Successfully signed up." });

	} catch (error) {

		console.log("Internal server error while signing up:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}

export const signin = async (req, res) => {

	try {

		const { username, password } = req.body;
		const ip = cleanupAddress(req.ip);

		if (username == "admin" || password == "admin") {
			res.cookie("troll_protocol", "lolol", { path: "/" });
			return res.status(401).json({ "troll": true, "message": "troll" });
		}
		
		const user = await UserModal.findOne({ username });
		if (!user) return res.status(400).json({ message: "User does not exist." });
		
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials." });

		await UserModal.findByIdAndUpdate(user._id, { lastLogin: Date.now() });

		let authToken = generateToken(69);
		while (await SessionModal.findOne({ authToken }))
			authToken = generateToken(69);

		await SessionModal.findByIdAndDelete(user._id);
		await SessionModal.create({ _id: user._id, ip, authToken });

		res.cookie("authToken", authToken, { path: "/", httpOnly: true, secure: true });
		return res.status(200).json({ message: "Successfully signed in." });

	} catch (error) {

		console.log("Internal server error while signing in:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}

export const signout = async (req, res) => {

	try {

		const { authToken } = req.cookies;

		await SessionModal.findOneAndDelete({ authToken });
		res.clearCookie('authToken');
		return res.status(200).json({ message: "Successfully signed out." });

	} catch (error) {

		console.log("Internal server error while signing out:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}