const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const JourneySchema = new Schema({
	driverId:{
		type: Number,
		required: true
	},
	schoolId:{
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	routeNum:{
		type: Number,
		required: true
	},
	allStudents:{
		type: [{ type: Schema.Types.ObjectId, ref: 'Student'}]
	},
	scannedStudents:{
		type: [{ type: Schema.Types.ObjectId, ref: 'Student'}]
	},
	timeStarted: {
		type: Date,
		default: Date.now
	}
});

module.exports = Journey = mongoose.model('Journey', JourneySchema);