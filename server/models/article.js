import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
	
	title: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
		default: [],
	},
	description: {
		type: String,
		default: "",
	},
	content: {
		type: String,
		default: "",
	},
	isPublic: {
		type: Boolean,
		default: false,
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