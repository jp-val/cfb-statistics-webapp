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
	lastUpdate: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model('Articles', articleSchema);