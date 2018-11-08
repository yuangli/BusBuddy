require("dotenv").config({ path: ".env" });

module.exports = {
	mongoURI: process.env.MONGO_URI,
	TWILIO_SID: process.env.TWILIO_SID,
	TWILIO_AUTH: process.env.TWILIO_AUTH,
	TWILIO_PHONE: process.env.TWILIO_PHONE
} 
