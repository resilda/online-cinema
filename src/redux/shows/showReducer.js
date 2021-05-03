import * as actionTypes from './showTypes';

const INITIAL_STATE = {
	loading: false,
	shows: [],
	error: '',
	favoriteCategory: [],
	currentTvShow: null,
	nameOfCategory: '',
	addCategory: []
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
		case actionTypes.GET_NEW_CATEGORY: {
			return {
				...state,
				nameOfCategory: action.payload
			};
		}
		case actionTypes.ADD_TO_NEW_CATEGORY: {
			const tvShow2 = state.shows.find((show) => show.id === action.payload.id);
			const inAddCategory = state.addCategory.find((show) => (show.id === action.payload.id ? true : false));
			return {
				...state,
				addCategory: inAddCategory
					? state.addCategory.map(
							(show) => (show.id === action.payload.id ? { ...show, qty: show.qty } : show)
						)
					: [ ...state.addCategory, { ...tvShow2, qty: 1 } ]
			};
		}
		case actionTypes.REMOVE_FROM_NEW_CATEGORY: {
			return {
				...state,
				addCategory: state.addCategory.filter((show) => show.id !== action.payload.id)
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
