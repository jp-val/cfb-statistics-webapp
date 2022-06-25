import bcrypt from 'bcryptjs';

import UserModal from '../models/user.js';
import SessionModal from '../models/session.js';

import { generateRandomString } from '../other/helper.js';

export const signup = async (req, res) => {

	try {

		const { username, password } = req.body;
		
		const user = await UserModal.findOne({ username });
		if (user) return res.status(200).json({ message: "Username already belongs to an existing user." });
		
		const hashedPassword = await bcrypt.hash(password, 11);
		await UserModal.create({ username, password: hashedPassword });

		return res.status(200).json({ message: "Sign up successful." });

	} catch (error) {

		console.log("Something went wrong during sign up:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const signin = async (req, res) => {

	try {

		const { ip, username, password } = req.body;
		
		const user = await UserModal.findOne({ username });
		if (!user) return res.status(200).json({ message: "Username does not exist." });
		
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return res.status(200).json({ message: "Invalid credentials." });

		await UserModal.findByIdAndUpdate(user._id, { lastLogin: Date.now() });

		const authToken = generateRandomString(69);
		const session = await SessionModal.findOne({ _id: user._id });

		if (session) {
			await SessionModal.findByIdAndUpdate(user._id, { ip, authToken, loginTime: Date.now() });
		} else {
			await SessionModal.create({ _id: user._id, ip, authToken });
		}

		return res.status(200).json({ authToken });

	} catch (error) {

		console.log("Something went wrong during sign in:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const signout = async (req, res) => {

	try {

		const { authToken } = req.body;

		await SessionModal.findOneAndDelete({ authToken });

		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong during sign out:", error.message);
		return res.status(200).json({ message: error.message });
	}
};