const express = require('express');
const router = express.Router();
const User = require('../../models/User');


router.post('/', (req, res) => {
	console.log(req.user);
	const data = req.user;
	res.json(data);
});


module.exports = router;