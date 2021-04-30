import React from 'react';
import './Pagination.css';

const Pagination = ({ showsPerPage, totalShows, maxPageNumberLimit, minPageNumberLimit, paginate }) => {
	const pageNumbers = [];

	//We calculate how many pages we need and push it in the array above
	for (let i = 1; i <= Math.ceil(totalShows / showsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="list-buttons">
				{pageNumbers.map((number) => {
					if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
						return (
							<li key={number}>
								<button onClick={() => paginate(number)} className="paginate-buttons">
									{number}
								</button>
							</li>
						);
					} else {
						return null;
					}
				})}
			</ul>
		</nav>
	);
};

export default Pagination;
