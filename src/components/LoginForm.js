import React, { Component } from "react";
import { Input } from "./common/input";

export default class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
		errors: [],
	};
	//username = React.createRef();

	validate = () => {
		const errors = {};
		const { account } = this.state;

		if (account.username.trim() === "")
			errors.username = "Username is required";

		if (account.password.trim() === "")
			errors.password = "Password is required";

		return Object.keys(errors).length === 0 ? null : errors;
	};

	handlSubmit = ({ e }) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });

		if (errors) return;
		//const username = this.username.current.value;
		//console.log(username);
		console.log("Submitted");
	};
	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty();

		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		let account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	};
	render() {
		const { account, errors } = this.state;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handlSubmit}>
					<Input
						value={account.username}
						lable="Username"
						name="username"
						onChange={this.handleChange}
						error={errors.username}
					/>
					<Input
						value={account.password}
						lable="Password"
						name="password"
						onChange={this.handleChange}
						error={errors.password}
					/>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}
