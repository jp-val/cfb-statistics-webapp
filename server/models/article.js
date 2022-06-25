import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
	
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	uploadDate: {
		type: Date,
		default: Date.now(),
	},
	lastUpdate: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model('Articles', articleSchema);