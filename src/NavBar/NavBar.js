import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
	return (
		<div className="wrapper">
			<Link to="/" className="logo">
				<h2 className="title">Online Cinema</h2>
			</Link>
			<div className="button-wrapper">
				<button onClick={(e) => e.target.value} className="button">
					<Link to="/favorites" className="button-text">
						Favorite Category
					</Link>
				</button>
				<button onClick={(e) => e.target.value} className="button">
					<Link to="/add-categories" className="button-text">
						New Category
					</Link>
				</button>
				<button onClick={(e) => e.target.value} className="button">
					<Link to="/all-categories" className="button-text">
						All Categories{' '}
					</Link>
				</button>
			</div>
		</div>
	);
};

export default NavBar;
