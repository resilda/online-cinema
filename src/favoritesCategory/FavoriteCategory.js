import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FavoriteShow from './FavoriteShow';

const FavoriteCategory = ({ favoriteCategory }) => {
	const [ totalShows, setTotalShows ] = useState(0);

	useEffect(
		() => {
			let items = 0;

			favoriteCategory.forEach((item) => {
				items += item.qty;
			});

			setTotalShows(items);
		},
		[ favoriteCategory, totalShows, setTotalShows ]
	);

	return (
		<div>
			<h1 className="in-categories">in: Favorite Category</h1>
			{favoriteCategory.map((show) => <FavoriteShow key={show.id} showData={show} />)}
			<span className="span">All movies in this category: {totalShows} </span>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		favoriteCategory: state.show.favoriteCategory
	};
};

export default connect(mapStateToProps)(FavoriteCategory);
