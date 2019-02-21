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
				                <div className="c-header-text c-header-subtext">More Details</div>
				        </header>

				        <div className="c-subheader">Michael Carbonara</div>

				        <div className="c-subtext">Southeast Elementary School <br />
				        Salt Lake City School District</div>
				        <div className="c-subtext"><strong>Pick-up Location:</strong><br />Jackson & Fillmore Street</div>
				        <div className="c-subtext"><strong>Pick-up Time: </strong>7:20am<br /><strong>Bus Number: </strong>345</div>
				        <div className="c-subheader">Scan History</div>
			</div>
		)
	}	
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);