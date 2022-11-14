import mongoose from 'mongoose';

const professorSchema = mongoose.Schema({
	
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		default: 1400,
	},
	wins: {
		type:Number,
		default: 0,
	},
	losses: {
		type:Number,
		default: 0,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	startDate: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('Professors', professorSchema);