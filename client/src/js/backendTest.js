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
		
		var coords = [ { "x": "-75.24364471435547", "y": "40.01336737624207" }, { "x": "-75.24246454238892", "y": "40.011493838944354" }, { "x": "-75.24270057678223", "y": "40.009768166987314" }, { "x": "-75.24286150932312", "y": "40.007837006164245" }, { "x": "-75.24253964424133", "y": "40.00579073784958" }, { "x": "-75.24261474609375", "y": "40.00534696072415" }, { "x": "-75.24300634860991", "y": "40.00539216037812" }, { "x": "-75.2439022064209", "y": "40.00583182817823" }, { "x": "-75.24851560592651", "y": "40.00728640987835" }, { "x": "-75.2547812461853", "y": "40.00942302736047" }, { "x": "-75.25830030441284", "y": "40.01078714046552" }, { "x": "-75.25978088378906", "y": "40.0112308822256" }, { "x": "-75.26121854782104", "y": "40.011017229145686" }, { "x": "-75.26257038116455", "y": "40.01064744338845" }, { "x": "-75.26417970657349", "y": "40.010039346898395" }, { "x": "-75.26459813117981", "y": "40.01062279093339" }, { "x": "-75.26356816291809", "y": "40.011033664021724" }, { "x": "-75.26356816291809", "y": "40.011033664021724" }, { "x": "-75.26356816291809", "y": "40.011033664021724" }, { "x": "-75.26356816291809", "y": "40.011033664021724" }, { "x": "-75.26356816291809", "y": "40.011033664021724" }, { "x": "-75.26356816291809", "y": "40.011033664021724" }, { "x": "-75.26356816291809", "y": "40.011033664021724" }, { "x": "-75.26224851608276", "y": "40.01151027370566" }, { "x": "-75.26242017745972", "y": "40.01221696469734" }, { "x": "-75.26426553726196", "y": "40.011485621562215" }, { "x": "-75.26636838912964", "y": "40.010737835647426" }, { "x": "-75.26711940765381", "y": "40.01037626589324" }, { "x": "-75.26812791824341", "y": "40.01001469422373" }, { "x": "-75.26786774396896", "y": "40.00956889015377" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26808232069016", "y": "40.00897311058388" }, { "x": "-75.26810646057129", "y": "40.01004756445465" }, { "x": "-75.27042388916016", "y": "40.009143627336776" }, { "x": "-75.27113199234009", "y": "40.01009686977135" }, { "x": "-75.27027368545532", "y": "40.01037626589324" }, { "x": "-75.27113199234009", "y": "40.01009686977135" }, { "x": "-75.27105689048767", "y": "40.01011330486901" }, { "x": "-75.27173280715942", "y": "40.01115692546594" }, { "x": "-75.27251601219176", "y": "40.01231557216097" }, { "x": "-75.27292370796204", "y": "40.013022254814686" }, { "x": "-75.27093887329102", "y": "40.01347419918735" }, { "x": "-75.26882529258728", "y": "40.01347419918735" }, { "x": "-75.26589632034302", "y": "40.01336737624207" }, { "x": "-75.26456594467163", "y": "40.0147807124514" }, { "x": "-75.26287078857422", "y": "40.016259753886466" }, { "x": "-75.26171207427979", "y": "40.01734436389964" }, { "x": "-75.25990962982178", "y": "40.01688422842362" }, { "x": "-75.26171207427979", "y": "40.01734436389964" }, { "x": "-75.26287078857422", "y": "40.016259753886466" }, { "x": "-75.26166915893555", "y": "40.01734436389964" }, { "x": "-75.2605104446411", "y": "40.01806742766483" }, { "x": "-75.25877237319946", "y": "40.01852755516267" }, { "x": "-75.25744199752808", "y": "40.01844538976562" }, { "x": "-75.25624036788939", "y": "40.01810029401754" }, { "x": "-75.25396585464478", "y": "40.01808386084316" }, { "x": "-75.25227069854736", "y": "40.01783736275242" }, { "x": "-75.25205612182617", "y": "40.01759086377122" }, { "x": "-75.25115489959717", "y": "40.017081429721834" }, { "x": "-75.24900913238524", "y": "40.017278630450136" }, { "x": "-75.24778604507446", "y": "40.01713072995733" }, { "x": "-75.2487301826477", "y": "40.01586534597136" }, { "x": "-75.24896621704102", "y": "40.01489575015707" }, { "x": "-75.24971723556519", "y": "40.014731410518195" }, { "x": "-75.25016784667969", "y": "40.0146328065449" }, { "x": "-75.24969577789307", "y": "40.01381110122725" }, { "x": "-75.24913787841797", "y": "40.013465982043655" }, { "x": "-75.24868726730345", "y": "40.013153729849954" }, { "x": "-75.24815082550049", "y": "40.013548153436126" }, { "x": "-75.24724960327148", "y": "40.01402474556157" }, { "x": "-75.24649858474731", "y": "40.01423838922712" }, { "x": "-75.24611234664917", "y": "40.01335094192795" }, { "x": "-75.24815082550049", "y": "40.013548153436126" }, { "x": "-75.24649858474731", "y": "40.01421373806908" }, { "x": "-75.24560809135437", "y": "40.014821797368555" }, { "x": "-75.24498581886292", "y": "40.01569279179173" }, { "x": "-75.24364471435547", "y": "40.01336737624207" } ];
		var poster = setInterval(printer, 3000);
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
