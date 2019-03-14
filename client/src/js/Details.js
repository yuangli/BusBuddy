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
				   
			</div>
		)
	}	
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);