const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	firstName: {
        type: String,
        required: false
    },
    lastName: {
        required: false,
        type: String
    },
    phoneNum: {
        required: false,
        unique: true,
        type: String
    },
    isPhoneNumVerified: {
        required: false,
        default: false,
        type: Boolean
    },
    email: {
        required: true,
        type: String
    },
    isEmailVerified: {
        required: false,
        type: Boolean
    },
    password: {
        required: true,
        type: String
    },
    createdAt: {
    	required: true,
    	default: Date.now,
    	type: Date
    },
    status1: {
        type: String
    },
    children: [Object]
});

module.exports = User = mongoose.model('user', UserSchema);