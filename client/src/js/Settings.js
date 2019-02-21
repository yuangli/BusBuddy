import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
	constructor(props) {
	    super(props);
	    this.goDashboard = this.goDashboard.bind(this);
 		this.goLogout = this.goLogout.bind(this);
	    
	    this.state = {
			activeChild : 0,
			data : null
		};
	}

	componentWillMount(){
		console.log('componentWillMount');
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

	goDashboard(){
		window.location.replace('/dashboard');
	}

	goLogout(){
		window.location.replace('/logout');
	}

	render(){
		if (this.state.data === null){
			var address = null;
			var phone = null;

		} else {
			console.log(this.state.data);
		}
			
		return(
			<div>
				   <a onClick={this.goDashboard}><img className="c-arrow" src="img/arrow.svg" alt="gear" /></a>
			        <header className="l-dashboard-header">
			                <div className="c-header-text">Settings</div>
			        </header>
			        <div className="c-subheader">Notifications</div>
			        <label className="container"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Recieve SMS Notifications
			                        <input type="checkbox" checked="checked" />
			                        <span className="checkmark"></span>
			                      </label>
			        <div className="c-subheader">Account Info</div>
			                <div className="c-subtext">Address:
			                <div className="c-account-info" style={{paddingLeft: "7em"}}>The Carbone Family<br />
			                                3221 Summer St<br />
			                                Philadelphia, PA</div></div>
			                <div className="c-subtext">Phone Number:</div>
			                <div className="c-account-info">(732)703-0178</div>
			  		

			        <button className="c-btn-log-view" onClick={this.goLogout}>Log out</button>
			</div>
		)
	}	
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);