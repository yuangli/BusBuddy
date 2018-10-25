const express = require('express');
const router = express.Router();

// @route GET api/schools
// @desc Get all schools
// @access Public (for now)
router.get('/', (req, res) => {
	res.send("hello world")
});

// @route POST api/schools
// @desc Add a school
// @access Public (for now)
router.post('/', (req, res) => {
	console.log(`Message: ${req.body.boop}`);
	var theMessage = req.body.boop;
	// console.log(`Request: ${JSON.stringify(req.body)}`);
	res.json({
		"text": "this is from the server",
		"messenger": theMessage,
		"entity": "four"
	});
});

module.exports = router;