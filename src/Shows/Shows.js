import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchShows } from '../redux/shows/showActions';
import Show from './Show/Show';
import Pagination from '../Pagination/Pagination';

const Shows = ({ shows, fetchShows, nameOfCategory, addCategory }) => {
	useEffect(
		() => {
			fetchShows();
		},
		[ fetchShows ]
	);

	//'nameOfCategory' is declared as an initial state in redux folder
	const [ categoryName, setCategoryName ] = useState(nameOfCategory);

	//to show the label where the user will name a new category on button click
	//it will be false on first try, because we want it to show on a button click
	const [ showLabel, setShowLabel ] = useState(false);

	//show and hide the button 'Add to New Category' and 'Remove from New Category'
	const [ labelNameSubmit, setLabelNameSubmit ] = useState(false);

	const handleSubmit = () => {
		setLabelNameSubmit(!labelNameSubmit);
	};

	//to check the movie we added if is on the New Category (named by the user) and try to change the button from 'Add' to 'Remove'
	let inAddCategory = addCategory.some(function(item) {
		return item.id === shows.id;
	});

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

	//Next Page --> Button Navigation
	const handleNextButton = () => {
		setCurrentPage(currentPage + 1);
		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	//Previous Page --> Button Navigation
	const handlePrevButton = () => {
		setCurrentPage(currentPage - 1);
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	//Load More Tv-shows in the application
	const handleLoadMore = () => {
		setShowsPerPage(showsPerPage + 5);
	};

	return (
		<div>
			<div className="add-category-wrapper">
				{showLabel ? (
					<label htmlFor="label" className="label">
						<input
							id="newCategory"
							value={categoryName}
							placeholder="Input category"
							onChange={(e) => setCategoryName(e.target.value)}
						/>
						<button onClick={handleSubmit} className="add-category-name">
							Add
						</button>
					</label>
				) : null}
				<button onClick={() => setShowLabel(!showLabel)} className="create-category-button">
					+
				</button>
			</div>
			<h1 className="h1-title">Welcome to Online Cinema</h1>
			{currentShows.loading ? (
				<h2>Loading...</h2>
			) : currentShows.error ? (
				<h2>{currentShows.error}</h2>
			) : (
				currentShows.map((show) => (
					<div key={show.id}>
						<Show
							showData={show}
							inAddCategory={inAddCategory}
							categoryName={categoryName}
							labelNameSubmit={labelNameSubmit}
						/>
					</div>
				))
			)}
			<footer>
				<ul className="list-buttons">
					<div>
						<button
							onClick={handlePrevButton}
							disabled={currentPage === 1 ? true : false}
							className="paginate-buttons"
						>
							Prev
						</button>
					</div>
					<div>{minPageNumberLimit >= 1 ? <li onClick={handlePrevButton}>&hellip;</li> : ''}</div>
					<div>
						<Pagination
							showsPerPage={showsPerPage}
							totalShows={shows.length}
							pageNumberLimit={pageNumberLimit}
							maxPageNumberLimit={maxPageNumberLimit}
							minPageNumberLimit={minPageNumberLimit}
							paginate={handlePagination}
						/>
					</div>
					<div>{shows.length > maxPageNumberLimit ? <li onClick={handleNextButton}>&hellip;</li> : ''}</div>
					<div>
						<button
							onClick={handleNextButton}
							disabled={currentPage === currentShows.length - 1 ? true : false}
							className="paginate-buttons"
						>
							Next
						</button>
					</div>
					<div>
						<button onClick={handleLoadMore} className="load-more-button">
							Load more
						</button>
					</div>
				</ul>
			</footer>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		shows: state.show.shows,
		nameOfCategory: state.show.nameOfCategory,
		addCategory: state.show.addCategory
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchShows: (id) => dispatch(fetchShows(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
