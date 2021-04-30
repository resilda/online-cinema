import React from 'react';
import FavoriteCategory from '../favoritesCategory/FavoriteCategory';
import './category.css';

const AllCategories = () => {
	return (
		<div>
			<h1 className="all-categories-title">All Categories</h1>
			<FavoriteCategory />
		</div>
	);
};

export default AllCategories;
