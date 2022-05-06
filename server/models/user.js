import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	projects: {
		type: [mongoose.Schema.ObjectId],
		default: [],
	},
	articles: {
		type: [mongoose.Schema.ObjectId],
		default: [],
	},
	lastLogin: {
		type: Date,
		default: Date.now(),
	},
	signUpDate: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model('Users', userSchema);