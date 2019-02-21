import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
	constructor(props) {
	    super(props);
	    this.goDashboard = this.goDashboard.bind(this);

	    
	    this.state = {
			activeChild : 0,
			data : null
		};
	}

	goDashboard(){
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		//Send to message handler on the backend
		//mfcbone@gmail.com
		//blabla1
		var details = {
			"email": email,
			"password": password
		}

		var formBody = [];
		for (var property in details) {
		  var encodedKey = encodeURIComponent(property);
		  var encodedValue = encodeURIComponent(details[property]);
		  formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");

		details = JSON.stringify(details);

		fetch('/login', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: details
		})
		.then(data => {
			console.log('Success.', data);
			window.location.replace('/dashboard')
		})
		.catch(err => {
			console.log('Error: ', err);
		});
	}

	render(){
		return(
			<div>
				  <img className="bus_img" style={{padding: "0", paddingLeft: "1em", marginBottom: "-3.2em"}} src="img/bus.svg" alt="School Bus" />
				  	<div className="sign-in-page">
				        <header className="l-dashboard-header">
				                <div className="c-header-text c-header-white">Sign In</div>
				        </header>
					    <div className="c-email-input">
					        <input className="email" type="text" placeholder="Email" name="email" id="email" />
					    </div>
					    <div className="c-password-input">
					            <input className="password" type="password" placeholder="Password" name="password" id="password" />
					    </div>
					    <div className="c-spacing__1">
					        <button className="c-btn-signup">Sign Up</button>
					    </div>
					    <div className="c-spacing__2">
					        <button className="c-btn-login" onClick={this.goDashboard}>Log In</button>
					    </div>
					</div>
			</div>
		)
	}	
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);