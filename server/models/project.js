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
	description: {
		type: String,
		default: "",
	},
	content: {
		type: String,
		default: "",
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