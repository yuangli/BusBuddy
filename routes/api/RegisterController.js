const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get('/', (req,res) => {
	res.send('Welcome to the register page')
});

router.post('/', (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;

	if (!email || !password){
		return res.status(501).send({ error: "Not all fields set."});
	}
	if (password !== password2){
		return res.status(501).send({ error: "Password fields do not match."});
	}
	if (password.length < 7){
		return res.status(501).send({ error: "Password not long enough"});
	}
	


	let newUser = new User({
		email,
		password
	});

	//Hash password
	bcrypt.genSalt(10, (err, salt) => 
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) return res.sendStatus(501);
			
			//Set password to hash
			newUser.password = hash;

			//Save to DB
			newUser.save()
				.then( user => {
					res.sendStatus(201);
				})
				.catch( err => res.status(501).send({error: err}));
	}));
	
	
	
});

module.exports = router;