const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SchoolSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	dateAdded: {
		type: Date,
		default: Date.now
	},
	routes:[{
		routeNum: String,
		students: [{
			type: String
		}]
	}]
});

module.exports = School = mongoose.model('school', SchoolSchema);