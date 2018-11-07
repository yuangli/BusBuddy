const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const StudentSchema = new Schema({
	studentrfid:{
		type: String,
		required: true
	},
	studentDetails: [{
		firstName:{
			type: String,
			required: false
		},
		lastName:{
			type: String,
			required: false
		},
		designatedStop:{
			type: String,
			required: false
		}
	}],
	parentDetails: [{
		firstName:{
			type: String,
			required: false
		},
		lastName:{
			type: String,
			required: false
		},
		phone:{
			type: String,
			required: false
		}
	}],
	scans: [{
		datetime:{
			type: Date,
			required: true,
			default: Date.now
		},
		location:{
			type: String,
			required: false
		},
		buddyid:{
			type: String,
			required: false
		},
		registeredSchool:{
			type: String,
			required: false
		},
		registeredRoute:{
			type: String,
			required: false
		}
	}]
});

module.exports = Student = mongoose.model('student', StudentSchema);