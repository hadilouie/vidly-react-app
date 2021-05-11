import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { Pagination } from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { ListGroup } from "./common/ListGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import _ from "lodash";

export default class Movie extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (moive) => {
		console.log(moive);
		const lstMovies = this.state.movies.filter((m) => m._id !== moive._id);
		this.setState({ movies: lstMovies });
	};

	handleLike = (moive) => {
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
	handlGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handlSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			movies: allMovies,
			selectedGenre,
		} = this.state;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((p) => p.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, sortColumn } = this.state;

		if (count === 0) return <p>This is no movies in Database</p>;

		const { totalCount, data: movies } = this.getPagedData();
		return (
			<div className="row">
				<div className="col-3">
					{" "}
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handlGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className="col">
					{" "}
					<p>showing {totalCount} movies in database</p>
					<MoviesTable
						onLike={this.handleLike}
						sortColumn={sortColumn}
						onDelete={this.handleDelete}
						onSort={this.handlSort}
						movies={movies}
					/>
					<Pagination
						ItemCount={totalCount}
						PageSize={pageSize}
						onPageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</div>
			</div>
		);
	}
}
