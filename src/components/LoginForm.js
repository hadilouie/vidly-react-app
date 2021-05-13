import React, { Component } from "react";
import { Input } from "./common/input";
import Joi from "joi-browser";

export default class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
		errors: [],
	};
	//username = React.createRef();

	schema = {
		username: Joi.string().required(),
		password: Joi.string().required(),
	};

	validate = () => {
		const { error } = Joi.validate(this.state.account, this.schema, {
			abortEarly: false,
		});

		if (!error) return null;
		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);

		return error ? error.details[0].message : null;
	};
	handlSubmit = (e) => {
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
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		let account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account, errors });
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
					<button disabled={this.validate()} className="btn btn-primary">
						Login
					</button>
				</form>
			</div>
		);
	}
}
