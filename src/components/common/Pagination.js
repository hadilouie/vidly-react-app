import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const Pagination = (props) => {
	const { ItemCount, PageSize, currentPage, onPageChange } = props;
	const pagesCount = Math.ceil(ItemCount / PageSize);
	if (pagesCount === 0) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page-item"}
					>
						<a
							onClick={() => onPageChange(page)}
							className="page-link"
							style={{ cursor: "pointer" }}
						>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	ItemCount: PropTypes.number.isRequired,
	PageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};
