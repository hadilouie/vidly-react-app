import React from "react";
import _ from "lodash";

export const Pagination = (props) => {
	const { ItemCount, PageSize } = props;
	const pagesCount = Math.ceil(ItemCount / PageSize);
	console.log(pagesCount);
	console.log(ItemCount);
	console.log(PageSize);
	if (pagesCount === 0) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				{pages.map((page) => (
					<li key={page} className="page-item">
						<a className="page-link">{page}</a>
					</li>
				))}
			</ul>
		</nav>
	);
};
