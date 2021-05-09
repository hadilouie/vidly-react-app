import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import { Pagination } from "./common/Pagination";

export default class Movie extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
	};

	handleDelete = (moive) => {
		console.log(moive);
		const lstMovies = this.state.movies.filter((m) => m._id !== moive._id);
		this.setState({ movies: lstMovies });
	};

	handleClick = (moive) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(moive);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
		console.log("Clicked....", movies[index].liked);
	};

	handlePageChange = (page) => {
		console.log(page);
	};

	render() {
		const { length: count } = this.state.movies;

		if (count === 0) return <p>This is no movies in Database</p>;

		return (
			<React.Fragment>
				<p>showing {count} movies in database</p>
				<table className="table">g
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.liked}
										onClick={() => this.handleClick(movie)}
									/>
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										className="btn btn-danger btn-sm"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					ItemCount={count}
					PageSize={this.state.pageSize}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}
}
