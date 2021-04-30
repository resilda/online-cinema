import * as actionTypes from './showTypes';

const INITIAL_STATE = {
	loading: false,
	shows: [],
	error: '',
	favoriteCategory: [],
	currentTvShow: null,
	addCategories: []
};

const showsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
		case actionTypes.FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				shows: action.payload,
				error: ''
			};
		case actionTypes.FETCH_FAILURE:
			return {
				...state,
				loading: false,
				shows: [],
				error: action.payload
			};
		case actionTypes.LOAD_CURRENT_SHOW:
			return {
				...state,
				currentTvShow: action.payload
			};
		case actionTypes.ADD_TO_FAVORITES: {
			//1. Get the shows data from the products array
			const tvShow = state.shows.find((show) => show.id === action.payload.id);
			//2. check if the show is in the favorite Category already
			const inFavoriteCategory = state.favoriteCategory.find(
				(show) => (show.id === action.payload.id ? true : false)
			);
			return {
				...state,
				favoriteCategory: inFavoriteCategory
					? state.favoriteCategory.map(
							(show) => (show.id === action.payload.id ? { ...show, qty: show.qty } : show)
						)
					: [ ...state.favoriteCategory, { ...tvShow, qty: 1 } ]
			};
		}
		case actionTypes.REMOVE_FROM_FAVORITES: {
			return {
				...state,
				favoriteCategory: state.favoriteCategory.filter((show) => show.id !== action.payload.id)
			};
		}
		case actionTypes.ADJUST_SHOW_NUMBER:
			return {
				...state,
				favoriteCategory: state.favoriteCategory.map(
					(show) => (show.id === action.payload.id ? { ...show, qty: +action.payload.qty } : show)
				)
			};
		default:
			return state;
	}
};

export default showsReducer;
