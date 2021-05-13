import React from "react";

export const Input = ({ name, lable, value, error, onChange }) => {
	return (
		<div className="form-group">
			{" "}
			<lable htmlFor={name}>{lable}</lable>{" "}
			<input
				value={value}
				name={name}
				onChange={onChange}
				id={name}
				type="text"
				className="form-control"
			></input>{" "}
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};
