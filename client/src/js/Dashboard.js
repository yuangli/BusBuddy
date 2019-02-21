import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
	constructor(props) {
	    super(props);
	    this.goMap = this.goMap.bind(this);

	    
	    this.state = {
			activeChild : 0,
			data : null
		};
	}

	componentWillMount(){
		let reponse;
		fetch('/api/users', {
				method: 'POST',
				credentials: 'include',
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(response => response.json())
			.then(data => {
				console.log('setting data state to ', data);
				this.setState({ data: data});
			})
			.catch(err => {
				console.log('Error: ', err);
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

	setActiveChild(index, num){
		this.setState({ activeChild: index });
		
		console.log("index: ", index);

		var kidsArr = document.getElementsByClassName("kidsss");
		console.log(kidsArr);
		

		Array.prototype.forEach.call(kidsArr, child => {
		  	child.classList.remove("child-selected");
		});

		kidsArr[index].classList.add("child-selected")
	}

	goMap(){
		console.log(this.state);
		if (this.state.data.children[this.state.activeChild].status === "Not on bus"){
			alert('Your child is not currently on a bus.');
		} else {
			window.location.replace('/map');
		}
	}

	setColors(){
		
	}

	goSettings(){
		window.location.replace('/settings');
	}

	goDetails(){
		window.location.replace('/details');
	}

	render(){
		if (this.state.data === null){
			var time = <span></span>;
			var status = <span></span>;
			var scheduled = <span></span>;
			var pickup = <span></span>;
			var kidsList = <span>
				<li><h2 className="dot"></h2></li>
				<li><h2 className="dot"></h2></li>
				<li><h2 className="dot"></h2></li>
			</span>;

		} else {
			console.log(this.state.data);
			var child = this.state.data.children[this.state.activeChild];
			var time = <span>{child.avgTime}</span>;
			var status = <span>{child.status}</span>;
			var scheduled = <span>{child.scheduledTime}</span>;
			var pickup = <span>{child.pickup}</span>;

			// var kidsList = <KidsList data={this.state.data} />

			var kidsList = this.state.data.children.map((value, index) => {
				if (index === 0){
					return( <li className="kidsss child-selected" onClick={this.setActiveChild.bind(this, index)}><span className="dot"></span>{value.name}</li> )
				} else { 
					return(
						<li className="kidsss" onClick={this.setActiveChild.bind(this, index)}><span className="dot"></span>{value.name}</li>
				)}
			});
		}	

		return(
			<div>
				<header className="l-dashboard-header">
				    <a onClick={this.goSettings}><img className="c-gear" src="img/gear.svg" alt="gear" /></a>
				    <div className="c-header-text">Dashboard</div>
				        <nav className="c-top-nav">
				            <ul className="c-top-nav__submenu">
				                {kidsList}
				            </ul>
				        </nav>
				</header>
				<main className="l-dashboard-main">
				    <div className="c-eta-text">
				        <div className="c-eta-text__text">ETA</div>
				        <div className="c-eta-text__timer">{scheduled}</div>
				        <span className="c-eta-text__meridiem">am</span>
				    </div>
				    <div className="c-status-box c-status-box__neutral">{status}</div>
				    <div className="arrow-down"></div>
				    <div className="c-timeline a-timeline">
				        <span style={{width: "60%"}}></span>
				        <div className="c-timeline__item c-timeline__home animation">
				            <img className="c-timeline__image" src="img/school_bus.svg" alt="School Bus" />
				        </div>
				        <div className="c-timeline__item c-timeline__bus animation">
				            <img className="c-timeline__image-2" src="img/profile.svg" alt="Profile" />
				        </div>
				        <div className="c-timeline__item c-timeline__bus school">
				            <img className="c-timeline__image-3" src="img/school.svg" alt="School" />
				        </div>
				    </div>

				    <div className="c-driver-info">
				        <div className="c-driver-info__label"><strong>Driver:</strong></div>
				        <div className="c-driver-info__text">Kendansha Wood <br /> VXP-312</div>
				    </div>

				    <button onClick={this.goMap} className="c-btn-map-view">Map View</button>

				</main>

			    <div className="c-student-info">
			        <div className="c-student-info__pickup"><b>Scheduled Pick-up Time:  </b> 7:20am</div>
			        <div className="c-student-info__location"><b>Pick-up location:  </b>
			                {pickup}</div>
			    </div>

			    <button className="c-btn-detail-view" onClick={this.goDetails}>Details</button>
			</div>
		)
	}	
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);