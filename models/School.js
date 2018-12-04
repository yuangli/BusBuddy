const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./Student');

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
		isActive: {type: Schema.Types.Boolean, ref: 'Journey'},
		students: [{ type: Schema.Types.ObjectId, ref: 'Student'}]
	}]
});

module.exports = School = mongoose.model('school', SchoolSchema);