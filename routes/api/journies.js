const express = require('express');
const router = express.Router();
const JourneyModel = require('../../models/Journey');
const SchoolModel = require('../../models/School');
const DriverCardModel = require('../../models/Drivercard');
const StudentModel = require('../../models/Student');
const config = require('../../config/keys');
const twilio = require('twilio')(config.TWILIO_SID, config.TWILIO_AUTH);

function exists(data){
	if (data.length != 0){
		return true;
	} else {
		return false;
	}
}

// @route GET api/journies
// @desc Get all journies
// @access Public (for now)
router.get('/', (req, res) => {
	JourneyModel.find().then( data => res.json(data));
});

<<<<<<< HEAD
// @route POST api/journies/start
// @desc Add a journey
// @access Public (for now)
router.post('/start', (req, res) => {

	//Simulated request from client
=======
// @route POST api/journies
// @desc Add a journey
// @access Public (for now)
router.post('/start', (req, res) => {
	
	const cardid = req.body.cardid;
	const school = req.body.school;
	const routeNum = req.body.route;
	const buddyId = req.body.buddy;
	let schoolId = '';

	//Simulated response from client
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
	// {
	// 	"cardid": "123456",
	// 	"school": "South Brunswick High School",
	// 	"route": "82",
	//	"buddy": "SereneOasis"
	// }
<<<<<<< HEAD
	
	const cardid = req.body.cardid;
	const school = req.body.school;
	const routeNum = req.body.route;
	const buddyId = req.body.buddy;
	let schoolId = '';
=======
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9

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
<<<<<<< HEAD

=======
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
				.catch(error => {
					console.log(`${error}: Error getting registered schools.`);
					return error;
				}); 
	})
<<<<<<< HEAD

=======
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
	.then((value) =>{
			console.log(`Driver card verified!`);

			//Call next verification step upon school verification
			return schoolVerify();
		})
<<<<<<< HEAD

=======
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
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
				.populate()
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

<<<<<<< HEAD
		//Triggered if passes verification
=======
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
		.then((value) =>{
			console.log(`School verified!`);
			return routeVerify();
		})

		.catch((error) =>{
			console.log(error);
			return res.json(error);
		});  
	}
<<<<<<< HEAD
	
	//Make sure route is tied with the verified school
	function routeVerify(){
		return new Promise((resolve, reject) => {
			console.log(`Verifying route...`);
=======

	function routeVerify(){
		return new Promise((resolve, reject) => {
			console.log(`Verifying route...`);
			//Make sure this route exists under the said school
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
			SchoolModel.find({ 
				'name' : school,
				routes : {$elemMatch: {routeNum: routeNum}},
			})
<<<<<<< HEAD

			.then( data => {
				if (exists(data)){
					//Make sure there isnt an active journey for this route
						JourneyModel.find({ 
							'schoolId' : schoolId,
							'routeNum' : routeNum,
							'isActive' : true
						})
						.then(data => {
							if (data.length != 0){
								reject('This route is currently activated! If you drove this route last, end it then restart it. If you did not drive this route last, please contact us to resolve this issue.')
							} else {
								return resolve(data);
							}
						})
						.catch(err => {
							return reject(err);
						});
				} else {
					reject('Route not verified. Either it doesn\'t exist or not eligible with this school.');
				}
			})

			.catch(error => {
				console.log(`${error}: Error getting registered routes.`);
				return error;
			}); 
=======
				.then( data => {
					if (exists(data)){
						//Make sure there isnt an active journey for this route
							JourneyModel.find({ 
								'schoolId' : schoolId,
								'routeNum' : routeNum,
								'isActive' : true
							})
							.then(data => {
								if (data.length != 0){
									reject('This route is currently activated! If you drove this route last, end it then restart it. If you did not drive this route last, please contact us to resolve this issue.')
								} else {
									return resolve(data);
								}
							})
							.catch(err => {
								return reject(err);
							});
					} else {
						reject('Route not verified. Either it doesn\'t exist or not eligible with this school.');
					}
				})
				.catch(error => {
					console.log(`${error}: Error getting registered routes.`);
					return error;
				}); 
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
		})

		.then((value) =>{
			console.log(`Route verified!`);
			initializeJourney();
			return res.json('Success.');
		})

		.catch((error) =>{
			console.log(error);
			return res.json(error);
		});  
	}
	
	function initializeJourney(){
<<<<<<< HEAD

		let studentData;

		//Populate user details for parents phone numbers
=======
		let studentData;
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
		SchoolModel.find({ 
			'name' : school
		})
		.where('routes.routeNum').equals(routeNum)
		.populate('routes.students')
		.then( data => {
			if (exists(data)){
<<<<<<< HEAD

				let schoolsRoutes = data[0].routes;

				//Loop through routes finding the right one
				for (let i = 0; i < schoolsRoutes.length; i++){
					
					console.log('Searching for route...');
					
					if (schoolsRoutes[i].routeNum == routeNum){
						//Storing the route info in a wider scope
						studentData = data;
						journeyCreation(schoolsRoutes[i]);
=======
				let schoolsRoutes = data[0].routes;
				for (let i = 0; i < schoolsRoutes.length; i++){
					console.log('Searching for route...');
					if (schoolsRoutes[i].routeNum == routeNum){
						journeyCreation(schoolsRoutes[i]);
						studentData = data;
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
					}
				}
			}
		})
<<<<<<< HEAD

		.catch(err => {
			console.log(err);
		});
	
		function journeyCreation(route){

			console.log('Creating journey!');

=======
		.catch(err => {
			console.log(err);
		});

		function journeyCreation(route){
			console.log('Creating journey!');
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
			return new Promise((resolve, reject) =>{
				JourneyModel.create({
					driverId: cardid,
					schoolName: school,
					schoolId: schoolId,
					isActive: true,
					routeNum: routeNum,
					allStudents: route.students
				}, function (err){
					if (err){
						return reject(err);
					} else {
						return resolve('Journey created successfully.');
					}

				});
			})
<<<<<<< HEAD

=======
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
			.then(message => {
				console.log(message);
				return notify();
			})
<<<<<<< HEAD

=======
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
			.catch(err => {
				return console.log(err);
			});
		}
<<<<<<< HEAD
		
		//Send notification SMS to all parents
		function notify(){

			console.log('Notifying parents!');

			//Loops through each childs details and sends text to parent number
			studentData[0].routes.map((value, index) =>{
				if (value.routeNum == routeNum){
					for (let i = 0; i < value.students.length; i++){
						
=======

		function queryTest(){
			console.log('Testing query!');
			JourneyModel.find()
			.populate('allStudents')
			.then(data =>{
				console.log(data)
			});
		}

		function notify(){
			console.log('Notifying parents!');
			//Loops through each childs details and sends text to parent number
			// console.log(studentData[0].routes);
			studentData[0].routes.map((value, index) =>{
				if (value.routeNum == routeNum){
					for (let i = 0; i < value.students.length; i++){
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
						let parentPhone = value.students[i].parentDetails[0].phone;
						let childName = value.students[i].studentDetails[0].firstName;
						
						console.log(`Sending notification to ${childName}\'s parent @ ${parentPhone}`);
						
						twilio.messages
						  .create({
						     body: `Here we come! ${childName}\'s bus is in your area and will be arriving within minutes. \n\nOpen the BusBuddy webapp to see exactly where it is. BusBuddy.com/view`,
						     from: `+1${config.TWILIO_PHONE}`,
						     to: `+1${parentPhone}`
						   })
						  .then(message => console.log(message.sid))
						  .done();
					}
				}
			});
		}
	}
});

<<<<<<< HEAD
// @route POST api/journies/end
// @desc Remove a journey
// @access Public (for now)
router.post('/end', (req, res) => {
	
	//Simulated request from client
=======
router.post('/end', (req, res) => {
	//Simulated request body
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
	// {
	// 	"cardid": "123456",
	// 	"school": "South Brunswick High School",
	// 	"route": "82",
	// 	"buddy": "SereneOasis"
	// }
	
	const cardid = req.body.cardid;
	const school = req.body.school;
	const routeNum = req.body.route;
	const buddyId = req.body.buddy;

	JourneyModel.updateOne({ 
		"schoolName" : school,
		"routeNum": routeNum,
		"isActive": true
	}, { isActive: false }, (err, numAffected) => {
		
		if (err) return res.send('Error!: ', err);
		
		let message = `Successfully updated active status of route ${routeNum} of ${school}`
<<<<<<< HEAD
		
		console.log(message);
		
=======
		console.log(message);
>>>>>>> a0d08c3ddda1d82e8d4278e1800b9ce3789e1fc9
		res.send(message);
	});
});


module.exports = router;