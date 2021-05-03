import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

const Details = ({ currentTvShow }) => {
	return (
		<section className="wrapper-page">
			{currentTvShow.image === null ? (
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWIufz4Th87v5jVp7hpkNUon5Hw3LI73muiq_l4QlIgt-UeMg9SuvFH7lnVWzuFdrMXY&usqp=CAU"
					alt={currentTvShow.name}
				/>
			) : (
				<img src={currentTvShow.image} alt={currentTvShow.name} />
			)}
			<section className="buttons-in-details-page">
				<a
					href={`https://www.tvmaze.com/shows/${currentTvShow.id}/${currentTvShow.name}`}
					className="url-component"
				>
					Go to Page
				</a>

				<Link to="/" className="url-component">
					Go back
				</Link>
			</section>
			<h2 className="title-component">{currentTvShow.name}</h2>
			<p className="details-summary-component">Summary: {currentTvShow.summary}</p>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		currentTvShow: state.show.currentTvShow
	};
};

export default connect(mapStateToProps)(Details);
