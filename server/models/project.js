import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
	
	title: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		default: "",
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

export default mongoose.model('Projects', projectSchema);