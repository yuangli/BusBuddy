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
		
		var coords = [{"x":"-75.24244308471678","y":"40.011477404179104"},{"x":"-75.24527549743652","y":"40.011871837452745"},{"x":"-75.25501728057861","y":" 40.00953807409665"},{"x":"-75.26235580444336","y":"40.012167660912084"},{"x":"-75.26394367218018","y":" 40.01877405076027"},{"x":"-75.26042461395264","y":" 40.02327654698791"},{"x":"-75.25776386260986","y":" 40.02551125229787"},{"x":"-75.25510311126709","y":" 40.02324368312839"},{"x":"-75.24673461914062","y":"  40.0216004699687"},{"x":"-75.24518966674805","y":"40.018839782769234"},{"x":"-75.24209976196288","y":" 40.01910271017195"},{"x":"-75.2360486984253","y":"40.013449547753275"},{"x":"-75.24102687835693","y":" 40.01188827212301"}];
		var poster = setInterval(printer, 10000);
		var start = 0;
		function printer(){
		    if (start === coords.length) return clearInterval(poster);
		    axios({
				method: 'post',
				url: '/api/buddies/data',
				data: {
					data: {
						x: coords[start].y,
						y: coords[start].x
					}
				}
			});
		    console.log(coords[start].x);
		    console.log(coords[start].y);
		    start++;
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

	refreshChild(){
		console.log('refreshChild called');
		axios({
			method: 'post',
			url: '/api/journies/reset'
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
					<div className="c-prototype">
						<div className="c-prototype__content">
							<h2 className="c-prototype__title">Reset Child</h2>
							<h3 className="c-prototype__list-title">What's happening:</h3>
							<ul>
								<li className="c-prototype__list-item">Each night, the system will reset the child's status to inactive</li>
								<li className="c-prototype__list-item">This way each morning, the interface should be fresh</li>
								<li className="c-prototype__list-item">The backend will reset each child to the default status</li>
							</ul> 
						</div>
						<div className="c-prototype__buttons">
							<button onClick={this.refreshChild} className="c-button c-prototype__button">Reset Child</button>
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
