const express = require('express');
const router = express.Router();
const JourneyModel = require('../../models/Journey');
const SchoolModel = require('../../models/School');
const DriverCardModel = require('../../models/Drivercard');

function exists(data){
	if (data.length != 0){
		return true;
	} else {
		return false;
	}
}

// @route GET api/schools
// @desc Get all schools
// @access Public (for now)
router.get('/', (req, res) => {
	JourneyModel.find().then( data => res.json(data));
});

// @route POST api/schools
// @desc Add a school
// @access Public (for now)
router.post('/', (req, res) => {
	
	const cardid = req.body.cardid;
	const school = req.body.school;
	const routeNum = req.body.route;
	const buddyId = req.body.buddy;
	let schoolId = '';

	//Simulated response from client
	// {
	// 	"cardid": "123456",
	// 	"school": "South Brunswick High School",
	// 	"route": "82",
	//	"buddy": "SereneOasis"
	// }

	//Must be sequential so function knows which route to look for under specified school
	var driverVerify = new Promise((resolve, reject) => {
		console.log(`Verifying driver`);
			DriverCardModel.find({'cardid':cardid})
				.then( data => {
					//Make sure response wasnt empty
					if (exists(data)){
						return resolve(true);
					} else {
						return reject('Driver ID does not exist');
					}
				})
				.catch(error => {
					console.log(`${error}: Error getting registered schools.`);
					return error;
				}); 
	})
	.then((value) =>{
			console.log(`Driver card verified!`);

			//Call next verification step upon school verification
			return schoolVerify();
		})
	.catch((error) =>{
		console.log(error);
		return res.json(error);
	});

	//Speed this up by combining route + school verification
	//Reduce queries to one per model if possible
	function schoolVerify(){
		return new Promise((resolve, reject) => {
			console.log(`Verifying school...`);
			SchoolModel.find({ 'name' : school })
				.then( data => {
					if (exists(data)){
						schoolId = data[0]._id;
						resolve(true);
					} else {
						reject('School not verified. Either it doesn\'t exist or not eligible with this school.');
					}
				})
				.catch(error => {
					console.log(`${error}: Error getting registered schools.`);
					return error;

				}); 
		})

		.then((value) =>{
			console.log(`School verified!`);
			return routeVerify();
		})

		.catch((error) =>{
			console.log(error);
			return res.json(error);
		});  
	}

	function routeVerify(){
		return new Promise((resolve, reject) => {
			console.log(`Verifying route...`);
			SchoolModel.find({ 
				'name' : school,
				routes : {$elemMatch: {routeNum: routeNum}}
			})
				.then( data => {
					if (exists(data)){
						resolve(true);
					} else {
						reject('Route not verified. Either it doesn\'t exist or not eligible with this school.');
					}
				})
				.catch(error => {
					console.log(`${error}: Error getting registered routes.`);
					return error;
				}); 
		})

		.then((value) =>{
			console.log(`Route verified!`);
			return res.json('Success.');
		})

		.catch((error) =>{
			console.log(error);
			return res.json(error);
		});  
	}

	//Create new journey
	//Link students to journey
	//Set status of students to bus incoming
	//Send notification to each parent

	// function initializeJourney(){
	// 	JourneyModel.create({
	// 		driverId: cardid,
	// 		schoolId: schoolId,
	// 		routeNum: routeNum,
	// 		allStudents: 
	// 		timeStarted: 
	// 	});
	// }
});

module.exports = router;