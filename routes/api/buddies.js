const express = require('express');
const router = express.Router();
const config = require('../../config/keys');
const twilio = require('twilio')(config.TWILIO_SID, config.TWILIO_AUTH);

const StudentModule = require('../../models/Student');
const StudentModel = StudentModule.model;
const Student = StudentModule.user;

// @route GET api/schools
// @desc Get all schools
// @access Public (for now)
router.get('/', (req, res) => {
	res.send('Welcome to the buddies API');
	// Student.find()
	// 	.sort({ studentrfid: -1 })
	// 	.then(students => res.json(students));
});

// @route POST api/schools
// @desc Add a school
// @access Public (for now)
router.post('/', (req, res) => {
	
	var studentID = req.body.student_id;
	res.json({
		"text": "this is from the server",
		"messenger": studentID
	});
	
	StudentModel.find( { studentrfid: studentID } )
	.then(students => {
		//Make the data parseable
		let tmp = JSON.stringify(students);
		let	data = JSON.parse(tmp);
		
		//Data response starts in an array
		//If no response, data still valid out of array
		//If response, make sure var can be verified
		data = (data[0]) ? data[0] : data;

		//Send to execute function if not empty and valid
		(Object.keys(data).length !== 0 && data.constructor === Object) ? execute(data) : empty(); 
	});
	
	//What to do if buddy is scanned and RFID exists in our DB
	function execute(result){
		let user = new Student(result);
		
		console.log(user.verify());
		console.log(user.getParentPhone());
		console.log(user.getParentFullName());
		console.log(user.getUserFullName());

		sendSuccessMessage(user.getUserFirstName(), user.getParentPhone());
	}
	
	//What to do when RFID doesnt exist in DB
	function empty(){
		console.log(`We couldn't find that BuddyID`);
	}

	function sendSuccessMessage(childFirst, parentPhone){
		console.log(`Sending message to ${childFirst}'s parent...`);
		twilio.messages
		  .create({
		     body: `${childFirst} just entered the bus safely! - BusBuddy`,
		     from: `+1${config.TWILIO_PHONE}`,
		     to: `+1${parentPhone}`
		   })
		  .then(message => console.log(message.sid))
		  .done();
	}
});

module.exports = router;