import React, { Component } from "react";
import Movie from "./components/Movie";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<Movie />
			</div>
		);
	}
}
