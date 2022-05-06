import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
	
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
		default: "",
	},
	repoLink: {
		type: String,
		default: "",
	},
	lastUpdate: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model('Projects', projectSchema);