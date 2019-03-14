import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
	constructor(props) {
	    super(props);
	    this.goMap = this.goMap.bind(this);
	    this.setStatusBar = this.setStatusBar.bind(this);

	    
	    this.state = {
			activeChild : 0,
			data : null,
			statusBarWidth: 0
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

	componentDidMount(){
		//Loop through calls to server
		setInterval(() => {
			let reponse;
			fetch('/api/users', {
					method: 'POST',
					credentials: 'include',
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(response => response.json())
				.then(res => {
					//Check if anything changed
					if ((res.children[this.state.activeChild].status == this.state.data.children[this.state.activeChild].status) && (res.children[this.state.activeChild].didScan == this.state.data.children[this.state.activeChild].didScan)){
						console.log('no update');
					} else {
						console.log('setting data state to ', res);
						this.setState({ data: res});

						if (res.children[this.state.activeChild].status == 'Not on bus'){
							this.setStatusBar(0);
						} else if (res.children[this.state.activeChild].status == 'Bus is on its way'){
							this.setStatusBar(1);
						} else if (res.children[this.state.activeChild].status == 'Bus has arrived at school'){
							this.setStatusBar(3);
						} else if (res.children[this.state.activeChild].status == 'Bus arrived, child scanned on!'){
							this.setStatusBar(2);
						}
					}
					
				})
				.catch(err => {
					console.log('Error: ', err);
				});
			
			
		}, 1500);
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

		if (index === 0){
			kidsArr[index].style.borderRadius = "8px 0px 0px 8px";
			kidsArr[index].style.marginLeft = "-8px";
			kidsArr[2].style.marginRight = "0px";
		} else if (index === 2){
			kidsArr[index].style.borderRadius = "0px 8px 8px 0px";
			kidsArr[index].style.marginRight = "-8px";
			kidsArr[0].style.marginLeft = "0px";
		}
		
		//Sets the status bar width when child is changed
		if (this.state.data.children[index].status == 'Not on bus'){
			console.log(this.state.data.children[index].status);
			this.setStatusBar(0);
		} else if (this.state.data.children[index].status == 'Bus is on its way'){
			this.setStatusBar(1);
		} else if (this.state.data.children[index].status == 'Bus arrived, child scanned on!'){
			this.setStatusBar(2);
		} else if (this.state.data.children[index].status == 'Bus has arrived at school'){
			this.setStatusBar(3);
		} else {
			console.log('Nah', this.state.data.children[index].status);
			this.setStatusBar(0);
		}
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
		window.location.replace('http://www.sabraydesign.com/busbuddy/settings.html');
	}

	setStatusBar(code){
		//0 = not started
		//1 = bus driver started
		//2 = child scanned on
		//3 = bus driver ended

		//When bus driver starts, set width to 20%, set color
		//When child scans on, turn circle green around kid, advance with to 50%
		//When driver ends, set width to 90%. If child was on, turn it all green. Else, turn it red
		var theBar = document.getElementById("statusBar");
		var icon1 = document.getElementById("status-icon1");
		var icon2 = document.getElementById("status-icon2");
		var icon3 = document.getElementById("status-icon3");

		if (code == 0){
			theBar.className = '';
			theBar.classList.add('a-moveToZero');
			icon1.style.border = "4px solid #bbb";
			icon2.style.border = "4px solid #bbb";
			icon3.style.border = "4px solid #bbb";
			theBar.style.backgroundColor = "#bbb";
		} else if (code == 1) {
			theBar.className = '';
			theBar.classList.add('a-moveToQuarter');
			icon1.style.border = "4px solid #fdc03e";
			icon2.style.border = "4px solid #bbb";
			icon3.style.border = "4px solid #bbb";
			theBar.style.backgroundColor = "#fdc03e";
		} else if (code == 2) {
			theBar.className = '';
			theBar.classList.add('a-moveToFifty');
			icon1.style.border = "4px solid green";
			icon2.style.border = "4px solid green";
			icon3.style.border = "4px solid #bbb";
			theBar.style.backgroundColor = "green";
		} else if (code == 3) {
			theBar.className = '';
			theBar.classList.add('a-moveToHundred');
			if (this.state.data.children[this.state.activeChild].didScan == true){
				icon1.style.border = "4px solid green";
				icon2.style.border = "4px solid green";
				icon3.style.border = "4px solid green";
				theBar.style.backgroundColor = "green";
			} else {
				icon1.style.border = "4px solid red";
				icon2.style.border = "4px solid red";
				icon3.style.border = "4px solid red";
				theBar.style.backgroundColor = "red";
			}
		}
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
			var dots = document.getElementsByClassName("dot");

			// var kidsList = <KidsList data={this.state.data} />
			
			var kidsList = this.state.data.children.map((value, index) => {
				var color;
				
				if (value.status == "Bus is on its way"){
					color = "#fdc03e";
				} else if (value.status == "Not on bus") {
					color = "#bbb";
				} else if (value.status == "Child made it to school!"){
					color = "green";
				} else {
					color = "#bbb";
				}

				if (index === 0){
					return( <li className="kidsss child-selected" style={{borderRadius: "10px 0px 0px 10px", marginLeft: "-8px"}} onClick={this.setActiveChild.bind(this, index)}><span className="dot" style={{backgroundColor: color}}></span>{value.name}</li> )
				} else { 
					return(
						<li className="kidsss" onClick={this.setActiveChild.bind(this, index)}><span className="dot" style={{backgroundColor: color}}></span>{value.name}</li>
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
				        <span id="statusBar" style={{width: this.state.statusBarWidth + '%'}}></span>
				        <div id="status-icon1" className="c-timeline__item c-timeline__home animation">
				            <img className="c-timeline__image" src="img/school_bus.svg" alt="School Bus" />
				        </div>
				        <div id="status-icon2" className="c-timeline__item c-timeline__bus animation">
				            <img className="c-timeline__image-2" src="img/profile.svg" alt="Profile" />
				        </div>
				        <div id="status-icon3" className="c-timeline__item c-timeline__bus school">
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