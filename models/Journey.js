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
	routeNum:{
		type: Number,
		required: true
	},
	allStudents:{
		type: [Number]
	},
	scannedStudents:{
		type: [Number]
	},
	timeStarted: {
		type: Date,
		default: Date.now
	}
});

module.exports = Journey = mongoose.model('Journey', JourneySchema);