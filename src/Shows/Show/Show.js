import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	addToFavorites,
	removeFromFavorites,
	addToNewCategory,
	removeFromNewCategory,
	loadCurrentShow
} from '../../redux/shows/showActions';
import './style.css';

const Show = ({
	showData,
	favoriteCategory,
	addToFavorites,
	removeFromFavorites,
	addToNewCategory,
	removeFromNewCategory,
	loadCurrentShow,
	inAddCategory,
	categoryName,
	labelNameSubmit
}) => {
	//to check the movie we added if is on Favorite Category and try to change the button from 'Add' to 'Remove'
	let inFavoriteCategory = favoriteCategory.some(function(show) {
		return showData.id === show.id;
	});

	return (
		<div>
			<div key={showData.id} className="wrapper-page">
				<section className="data">
					{' '}
					{showData.image === null ? (
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWIufz4Th87v5jVp7hpkNUon5Hw3LI73muiq_l4QlIgt-UeMg9SuvFH7lnVWzuFdrMXY&usqp=CAU"
							alt={showData.name}
						/>
					) : (
						<img src={showData.image} alt={showData.name} />
					)}
					<a href={`https://www.tvmaze.com/shows/${showData.id}/${showData.name}`} className="url-component">
						Go to Page
					</a>
					<h2 className="title-component">{showData.name}</h2>
					<h3 className="components">{showData.genre}</h3>
				</section>
				<section className="buttons-wrapper">
					<button onClick={() => loadCurrentShow(showData)} className="main-buttons">
						<Link to={`/details/${showData.id}/${showData.name}`} className="details-buttons">
							Details
						</Link>
					</button>
					<div>
						{inFavoriteCategory ? (
							<button onClick={() => removeFromFavorites(showData.id)} className="main-buttons">
								Remove from Favorites
							</button>
						) : (
							<button onClick={() => addToFavorites(showData.id)} className="main-buttons">
								Add to Favorites
							</button>
						)}
					</div>
					<div>
						{labelNameSubmit ? inAddCategory ? (
							<button onClick={() => removeFromNewCategory(showData.id)} className="main-buttons">
								Remove
							</button>
						) : (
							<button onClick={() => addToNewCategory(showData.id)} className="main-buttons">
								Add to {categoryName}
							</button>
						) : null}
					</div>
				</section>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		favoriteCategory: state.show.favoriteCategory,
		nameOfCategory: state.show.nameOfCategory,
		addCategory: state.show.addCategory
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToFavorites: (id) => dispatch(addToFavorites(id)),
		removeFromFavorites: (id) => dispatch(removeFromFavorites(id)),
		addToNewCategory: (id) => dispatch(addToNewCategory(id)),
		removeFromNewCategory: (id) => dispatch(removeFromNewCategory(id)),
		loadCurrentShow: (show) => dispatch(loadCurrentShow(show))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
