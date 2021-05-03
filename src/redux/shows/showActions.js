import axios from 'axios';
import * as actionTypes from './showTypes';

//Fetching data
export const fetchRequest = (showID) => {
	return {
		type: actionTypes.FETCH_REQUEST,
		payload: showID
	};
};

//To store the list of tv-shows if the request is successful
export const fetchSuccess = (shows) => {
	return {
		type: actionTypes.FETCH_SUCCESS,
		payload: shows
	};
};

//To store an error message if the request failed
export const fetchFailure = (error) => {
	return {
		type: actionTypes.FETCH_FAILURE,
		payload: error
	};
};

//We want to load the show the user has chosen
//We want all of its' information not only the ID,
//so the << payload >> strucure includes all the show's information
export const loadCurrentShow = (show) => {
	return {
		type: actionTypes.LOAD_CURRENT_SHOW,
		payload: show
	};
};

//Actions to << add >> and << remove >> a certain tv-show
export const addToFavorites = (showsID) => {
	return {
		type: actionTypes.ADD_TO_FAVORITES,
		payload: {
			id: showsID
		}
	};
};

export const removeFromFavorites = (showsID) => {
	return {
		type: actionTypes.REMOVE_FROM_FAVORITES,
		payload: {
			id: showsID
		}
	};
};

//The << value >> attribute is unique for every Item
//and is responsibile to be incremented or decremented based on the user choice
export const adjustShowNumber = (showsID, value) => {
	return {
		type: actionTypes.ADJUST_SHOW_NUMBER,
		payload: {
			id: showsID,
			qty: value
		}
	};
};

//Get new category and its's name by the user
export const getNewCategory = (name) => {
	return {
		type: actionTypes.GET_NEW_CATEGORY,
		payload: {
			nameOfCategory: name
		}
	};
};

//Add tv-shows to the new category created
export const addToNewCategory = (showsID) => {
	return {
		type: actionTypes.ADD_TO_NEW_CATEGORY,
		payload: {
			id: showsID
		}
	};
};

//Remove tv-shows from new category created
export const removeFromNewCategory = (showsID) => {
	return {
		type: actionTypes.REMOVE_FROM_NEW_CATEGORY,
		payload: {
			id: showsID
		}
	};
};

//by making use of 'thunk', it will return a function
export const fetchShows = (showID) => {
	return (dispatch) => {
		dispatch(fetchRequest(showID));
		axios
			.get('http://api.tvmaze.com/schedule?country=US')
			.then((response) => {
				const shows = response.data;
				dispatch(fetchSuccess(shows));
			})
			.catch((error) => {
				const message = error.message;
				dispatch(fetchFailure(message));
			});
	};
};
