import SessionModal from "../models/session.js";
import { cleanupAddress } from "../other/ip.js";

// 200 Ok
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found
// 500 Internal Error

export const authenticate = async (req, res, next) => {

	try {

		const { authToken } = req.cookies;
		const ip = cleanupAddress(req.ip);

		const session = await SessionModal.findOne({ authToken });
		if (!session) return res.status(401).json({ message: "Invalid authentication token." });

		if (ip != session.ip) {
			await SessionModal.findByIdAndDelete(session._id);
			return res.status(401).json({ message: "IP address does not match active session." });
		}

		var timeElapsed = Date.now() - session.loginTime;
		var seconds = timeElapsed / 1000;
		var minutes = seconds / 60;
		var hours = minutes / 60;

		console.log('ip:', ip, 'token:', session.authToken.substring(0, 10), 'hours passed:', hours);

		if (hours > 6) {
			res.clearCookie('authToken');
			await SessionModal.findByIdAndDelete(session._id);
			return res.status(401).json({ message: "Authentication token expired." });
		}

		res.locals.id = session._id;

		next();
	
	} catch (error) {

		console.log("Internal server error while authenticating user:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const finish = async (req, res) => {

	try {

		return res.status(200).json({ authenticated: true });
	
	} catch (error) {

		console.log("Internal server error while finishing:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};