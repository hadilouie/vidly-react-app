import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Customers from "./components/Customers";
import Movie from "./components/Movie";
import { NavBar } from "./components/NavBar";
import NotFound from "./components/NotFound";
import Rental from "./components/Rental";
import { MovieForm } from "./components/MovieForm";

export default class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<div className="container">
					<Switch>
						<Route path="/movies/:id">
							<MovieForm />
						</Route>
						<Route path="/movies">
							<Movie />
						</Route>
						<Route path="/customers">
							{" "}
							<Customers />
						</Route>
						<Route path="/rentals">
							{" "}
							<Rental />
						</Route>
						<Route path="/not-found">
							<NotFound />
						</Route>
						<Redirect from="/" exact to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}
