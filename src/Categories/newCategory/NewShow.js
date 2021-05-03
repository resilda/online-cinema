import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustShowNumber, removeFromNewCategory, loadCurrentShow } from '../../redux/shows/showActions';

const NewShow = ({ showData, removeFromNewCategory, loadCurrentShow }) => {
	return (
		<div>
			<div className="favorite-page">
				{' '}
				<section>
					{showData.image === null ? (
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWIufz4Th87v5jVp7hpkNUon5Hw3LI73muiq_l4QlIgt-UeMg9SuvFH7lnVWzuFdrMXY&usqp=CAU"
							alt={showData.name}
						/>
					) : (
						<img src={showData.image} alt={showData.name} />
					)}
					<h2 className="title-component">{showData.name}</h2>
					<p className="summary-component">Summary: {showData.summary}</p>
				</section>
				<section className="buttons-wrapper">
					<button onClick={() => loadCurrentShow(showData)} className="button-2">
						<Link to={`/details/${showData.id}`}>Details</Link>
					</button>
					<button onClick={() => removeFromNewCategory(showData.id)} className="button-2">
						Remove
					</button>
				</section>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeFromNewCategory: (id) => dispatch(removeFromNewCategory(id)),
		adjustShowNumber: (id, value) => dispatch(adjustShowNumber(id, value)),
		loadCurrentShow: (item) => dispatch(loadCurrentShow(item))
	};
};

export default connect(null, mapDispatchToProps)(NewShow);
