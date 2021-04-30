import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchShows } from '../redux/shows/showActions';
import Show from './Show/Show';
import Pagination from '../Pagination/Pagination';

const Shows = ({ shows, fetchShows }) => {
	useEffect(
		() => {
			fetchShows();
		},
		[ fetchShows ]
	);

	const [ pageNumberLimit ] = useState(5);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ showsPerPage, setShowsPerPage ] = useState(5);
	const [ maxPageNumberLimit, setMaxPageNumberLimit ] = useState(5);
	const [ minPageNumberLimit, setMinPageNumberLimit ] = useState(0);

	//Get current shows
	const indexOfLastShow = currentPage * showsPerPage;
	const indexOfFirstShow = indexOfLastShow - showsPerPage;
	const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

	//Change Page
	const handlePagination = (pageNumber) => {
		return setCurrentPage(pageNumber);
	};

	const handleNextButton = () => {
		setCurrentPage(currentPage + 1);
		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	const handlePrevButton = () => {
		setCurrentPage(currentPage - 1);
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	const handleLoadMore = () => {
		setShowsPerPage(showsPerPage + 5);
	};

	return (
		<div>
			<h1 className="h1-title">Welcome to Online Cinema</h1>
			{currentShows.loading ? (
				<h2>Loading...</h2>
			) : currentShows.error ? (
				<h2>{currentShows.error}</h2>
			) : (
				currentShows.map((show) => (
					<div key={show.id}>
						<Show showData={show} />
					</div>
				))
			)}
			<footer>
				<ul className="list-buttons">
					<li>
						<button
							onClick={handlePrevButton}
							disabled={currentPage === 1 ? true : false}
							className="paginate-buttons"
						>
							Prev
						</button>
					</li>
					<li>{minPageNumberLimit >= 1 ? <li onClick={handlePrevButton}>&hellip;</li> : ''}</li>
					<li>
						<Pagination
							showsPerPage={showsPerPage}
							totalShows={shows.length}
							pageNumberLimit={pageNumberLimit}
							maxPageNumberLimit={maxPageNumberLimit}
							minPageNumberLimit={minPageNumberLimit}
							paginate={handlePagination}
						/>
					</li>
					<li>{shows.length > maxPageNumberLimit ? <li onClick={handleNextButton}>&hellip;</li> : ''}</li>
					<li>
						<button
							onClick={handleNextButton}
							//disabled={!currentPage === shows.length - 1 ? true : false}
							className="paginate-buttons"
						>
							Next
						</button>
					</li>
					<li>
						<button onClick={handleLoadMore} className="load-more-button">
							Load more
						</button>
					</li>
				</ul>
			</footer>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		shows: state.show.shows
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchShows: (id) => dispatch(fetchShows(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
