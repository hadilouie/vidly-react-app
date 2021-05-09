import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default class Like extends Component {
	render() {
		let classes = "fa fa-heart";
		if (!this.props.liked) classes += "-o";
		return (
			<div>
				{/* <FontAwesomeIcon icon={faHeart} /> */}
				<i
					className={classes}
					onClick={this.props.onClick}
					aria-hidden="true"
					style={{ cursor: "pointer", color: "green" }}
				></i>
			</div>
		);
	}
}
