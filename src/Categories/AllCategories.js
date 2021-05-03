import React from 'react';
import FavoriteCategory from '../favoritesCategory/FavoriteCategory';
import './category.css';
import NewCategrory from './newCategory/NewCategrory';

const AllCategories = () => {
	return (
		<div>
			<h1 className="all-categories-title">All Categories</h1>
			<FavoriteCategory />
			<NewCategrory />
		</div>
	);
};

export default AllCategories;
