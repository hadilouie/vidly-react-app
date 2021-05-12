import React from "react";
import { useParams } from "react-router";

export const MovieForm = (props) => {
	const { id } = useParams();

	return (
		<div>
			<h1>Movie form {id}</h1>
			{/* <h1>Movie form {match.params.id}</h1>
			<button
				className="btn btn-primary"
				onClick={() => history.push("/movies")}
			>
				Save
			</button> */}
		</div>
	);
};
