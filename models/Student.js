const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const StudentSchema = new Schema({
	studentrfid: {
		type: String,
		required: true
	},
	uniquecode: String,
	studentDetails: [{
		firstName: String,
		lastName: String,
		designatedStop: String,
	}],
	parentDetails: [{}],
	scans: [{
		datetime: {
			type: Date,
			default: Date.now
		},
		location: String,
		buddyid: String,
		registeredSchool: String,
		registeredRoute: String
	}]
});

module.exports = mongoose.model('Student', StudentSchema);



