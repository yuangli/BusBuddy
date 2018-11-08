const express = require('express');
const router = express.Router();

const Student = require('../../models/Students');

// @route GET api/schools
// @desc Get all schools
// @access Public (for now)
router.get('/', (req, res) => {
	res.send('Welcom to the buddies API');
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
		"messenger": theMessage
	});
});

module.exports = router;