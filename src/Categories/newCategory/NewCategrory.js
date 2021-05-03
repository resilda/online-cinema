import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NewShow from './NewShow';

const NewCategory = ({ addCategory }) => {
	const [ newTotalShows, setNewTotalShows ] = useState(0);

	useEffect(
		() => {
			let items = 0;

			addCategory.forEach((item) => {
				items += item.qty;
			});
			setNewTotalShows(items);
		},
		[ addCategory, newTotalShows, setNewTotalShows ]
	);

	return (
		<div>
			<h1 className="in-categories">in: Added Category</h1>
			{addCategory.map((show) => <NewShow key={show.id} showData={show} />)}
			<span className="span">All movies in this category: {newTotalShows}</span>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		addCategory: state.show.addCategory
	};
};

export default connect(mapStateToProps)(NewCategory);
