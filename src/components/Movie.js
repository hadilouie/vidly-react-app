import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import { Pagination } from "./common/Pagination";
import { paginate } from "../utils/paginate";

export default class Movie extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1,
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
		this.setState({ currentPage: page });
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, movies: allMovies } = this.state;

		const movies = paginate(allMovies, currentPage, pageSize);

		if (count === 0) return <p>This is no movies in Database</p>;

		return (
			<React.Fragment>
				<p>showing {count} movies in database</p>
				<table className="table">
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
						{movies.map((movie) => (
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
					PageSize={pageSize}
					onPageChange={this.handlePageChange}
					currentPage={currentPage}
				/>
			</React.Fragment>
		);
	}
}
