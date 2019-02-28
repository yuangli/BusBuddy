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
				<div class="sign-in-page">
		            <header class="l-dashboard-header">
		                    <div class="c-header-text c-header-white"></div>
		            </header>
		            <div class="c-email-input">
		                    <input class="email" type="text" placeholder="Email" name="email" id="email" />
		            </div>
		            <div class="c-password-input">
		                    <input class="password" type="password" placeholder="Password" name="password" id="password" />
		            </div>
		            <div class="c-spacing__1">
		                <button class="c-btn-signup" onclick="alert('Coming soon!')">Sign Up</button>
		            </div>
		            <div class="c-spacing__2">
		                <button class="c-btn-login" onclick={this.goDashboard}>Log In</button>
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