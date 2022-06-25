import SessionModal from '../models/session.js';

export const authenticate = async (req, res, next) => {

	try {

		const { ip, authToken } = req.body;

		const session = await SessionModal.findOne({ authToken });
		if (!session) return res.status(200).json({ message: 'Invalid authentication token.' });

		// if (ip != session.ip) {
		// 	SessionModal.findByIdAndDelete(session._id);
		// 	return res.status(200).json({ message: 'IP address does not match active session.' });
		// }

		var timeElapsed = Date.now() - session.loginTime;
		var seconds = timeElapsed / 1000;
		var minutes = seconds / 60;
		var hours = minutes / 60;

		console.log('hours passed:', hours);

		if (hours > 6) {
			SessionModal.findByIdAndDelete(session._id);
			return res.status(200).json({ message: 'Authentication token expired.' });
		}

		req.body.id = session._id;

		next();
	
	} catch (error) {

		console.log('Something went wrong during authentication:', error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const doNothing = async (req, res) => {

	try {

		return res.status(200).json({ authenticated: true, message: 'Session authenticated.' });
	
	} catch (error) {

		console.log('Something went wrong while doing nothing:', error.message);
		return res.status(200).json({ message: error.message });
	}
};
