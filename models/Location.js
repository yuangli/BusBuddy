const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const LocationSchema = new Schema({
	x : {
		type: String
	},
	y: {
		type: String
	},
	speed: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = Location = mongoose.model('location', LocationSchema);