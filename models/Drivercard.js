const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const DriverCardSchema = new Schema({
	id:{
		type: Number,
		required: true
	}
});

module.exports = Journey = mongoose.model('Drivercard', DriverCardSchema);