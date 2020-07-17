import React from 'react';
import './App.css';
import Core from './ysp-core/Core';
import NotificationsContainer from './containers/NotificationsContainer/NotificationsContainer';
import Signin from './components/Signin/Signin';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			isLoggedIn: localStorage.getItem('token') ? true : false,
			token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
		};



		// Bind these.
		this.handleSubmitBtnClicked = this.handleSubmitBtnClicked.bind(this);
		this.handleOnInputChange = this.handleOnInputChange.bind(this);
		this.handleTestApiBtnClicked = this.handleTestApiBtnClicked.bind(this);
		this.handleSignoutBtnClicked = this.handleSignoutBtnClicked.bind(this);
	}



	handleSubmitBtnClicked() {
		console.log("\n\n\nin METHOD:: handleSubmitBtnClicked()");

		Core.yspCrud({
			method: 'post',
			url: '/api-signin',
			params: {
				email: this.state.email,
				password: this.state.password
			},
			neededResponseParams: [
				'doesPasswordMatch',
				'token'
			],
			callBackFunc: (requestData, json) => {
				console.log("\n\n\njson.doesPasswordMatch ==> " + json.doesPasswordMatch);

				if (json.doesPasswordMatch) {
					localStorage.setItem('token', json.token);
					this.setState({ token: json.token });
					this.setState({ isLoggedIn: true });
					console.log("token set!");
				}
			}
		});
	}


	handleTestApiBtnClicked() {
		console.log("\n\n\nin METHOD:: handleTestApiBtnClicked()");

		Core.yspCrud({
			url: '/test2',
			params: {
				api_token: this.state.token
			},
			callBackFunc: (requestData, json) => {

			}
		});
	}



	handleOnInputChange(e) {
		console.log("\n\n\nin METHOD:: handleOnInputChange()");

		const value = e.target.value;
		const name = e.target.name;

		this.setState({
			[name]: value
		});
	}



	handleSignoutBtnClicked() {
		console.log("\n\n\nin METHOD:: handleSignoutBtnClicked()");

		localStorage.clear();
		this.setState({ isLoggedIn: false });
	}



	render() {
		const signinComponent = (
			<Signin isSignedIn={this.state.isLoggedIn}
				submitBtnClicked={this.handleSubmitBtnClicked}
				testApiBtnClicked={this.handleTestApiBtnClicked}
				signoutBtnClicked={this.handleSignoutBtnClicked}
				onInputChange={this.handleOnInputChange} />
		);

		let notifications = null;

		if (this.state.isLoggedIn) { notifications = <NotificationsContainer />; }


		return (
			<div className="App">
				{signinComponent}
				{notifications}
			</div>
		);
	}
}

export default App;
