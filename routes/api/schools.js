const express = require('express');
const router = express.Router();

//School Model
const School = require('../../models/School');

// @route GET api/schools
// @desc Get all schools
// @access Public (for now)
router.get('/', (req, res) => {
	School.find()
		.sort({ dateAdded: -1 })
		.then(schools => res.json(schools))
});

// @route POST api/schools
// @desc Add a school
// @access Public (for now)
router.post('/', (req, res) => {
	const newSchool = new School({
		name: req.body.name
	});

	newSchool.save().then(school => res.json(school));
});

// @route DELETE api/schools
// @desc Delete a school
// @access Public (for now)
router.delete('/:id', (req, res) => {
	School.findById(req.params.id)
	.then(school => school.remove().then(() => res.json({success: true})))
	.catch(err => res.status(404).json({success: false}));
});


module.exports = router;