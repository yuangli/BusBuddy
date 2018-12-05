import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
	startJourney(num){
		//Routenum with sarah and me is 371
		//Route num with just me is 82
		//Route num with just sarah is 122
		let routeNum;
		if (num == 1){
			routeNum = 82;
		} else if (num == 2){
			routeNum = 371;
		}
		
		axios({
			method: 'post',
			url: '/api/journies/start',
			data: {
				"cardid": "123456",
				"school": "South Brunswick High School",
				"route": routeNum,
				"buddy": "SereneOasis"
			}
		});
	}

	scanKid(){
		console.log("hello");
		axios({
			method: 'post',
			url: '/api/buddies/',
			data: {
				"student_id" : "123"
			}
		});
	}

	endJourney(num){
		let routeNum;
		if (num == 1){
			routeNum = 82;
		} else if (num == 2){
			routeNum = 371;
		}
		axios({
			method: 'post',
			url: '/api/journies/end',
			data: {
				"cardid": "123456",
				"school": "South Brunswick High School",
				"route": routeNum,
				"buddy": "SereneOasis"
			}
		});
	}

	render(){
		return(
			<div>
				<div className="prototype-title">
					<h1 className="title">Bus Buddy</h1>
					<h2 className="sub-title">Backend Prototype</h2>
				</div>
				<div className="prototypes">
					<div className="c-prototype">
						<div className="c-prototype__content">
							<h2 className="c-prototype__title">Journey Start</h2>
							<h3 className="c-prototype__list-title">What's happening:</h3>
							<ul>
								<li className="c-prototype__list-item">Front-end sends fake form with the DriverID, School, Route, and BuddyID</li>
								<li className="c-prototype__list-item">Backend processes request and makes sure information is valid and correlates with what the school provided</li>
								<li className="c-prototype__list-item">Add journey to database</li>
								<li className="c-prototype__list-item">Send notification to all students' parents on the initialized route</li>
							</ul> 
						</div>
						<div className="c-prototype__buttons">
							<button onClick={() => {this.startJourney(1)}} className="c-button c-prototype__button">Start Journey 1</button>
							<button onClick={() => {this.startJourney(2)}} className="c-button c-prototype__button">Start Journey 2</button>
						</div>
					</div>
					<div className="c-prototype">
						<div className="c-prototype__content">
							<h2 className="c-prototype__title">Simulate Scan</h2>
							<h3 className="c-prototype__list-title">What's happening:</h3>
							<ul>
								<li className="c-prototype__list-item">Python program that will run on BusBuddy device sends the child's unique RFID</li>
								<li className="c-prototype__list-item">Backend processes request and gathers student's info based on the unique RFID</li>
								<li className="c-prototype__list-item">Backend sends text message to child's parent contact</li>
							</ul> 
						</div>
						<div className="c-prototype__buttons">
							<button onClick={this.scanKid}  className="c-button c-prototype__button">Activate</button>
						</div>
					</div>
					<div className="c-prototype">
						<div className="c-prototype__content">
							<h2 className="c-prototype__title">Journey End</h2>
							<h3 className="c-prototype__list-title">What's happening:</h3>
							<ul>
								<li className="c-prototype__list-item">Similar to initializing the route, credentials are sent with the journey details</li>
								<li className="c-prototype__list-item">Sent credentials are validated and sanitized</li>
								<li className="c-prototype__list-item">Backend looks for that active journey, sets it to inactive</li>
								<li className="c-prototype__list-item">Send notification to all students' parents on the initialized route</li>
							</ul> 
						</div>
						<div className="c-prototype__buttons">
							<button onClick={() => {this.endJourney(1)}} className="c-button c-prototype__button">End Journey 1</button>
							<button onClick={() => {this.endJourney(2)}} className="c-button c-prototype__button">End Journey 2</button>
						</div>
					</div>
				</div>
			</div>
		)
	}	
}

ReactDOM.render(
  <App>Hello</App>,
  document.getElementById('root')
);
