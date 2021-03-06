import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Shows from './Shows/Shows';
import Details from './Shows/Show/Details';
import AllCategories from './Categories/AllCategories';
import FavoriteCategory from './favoritesCategory/FavoriteCategory';
import NewCategrory from './Categories/newCategory/NewCategrory';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Shows} />
					<Route path="/details/:id" component={Details} />
					<Route path="/favorites" component={FavoriteCategory} />
					<Route path="/all-categories" component={AllCategories} />
					<Route path="/new-categories" component={NewCategrory} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
