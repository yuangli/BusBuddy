require("dotenv").config({ path: ".env" });

module.exports = {
	mongoURI: process.env.MONGO_URI
} 
