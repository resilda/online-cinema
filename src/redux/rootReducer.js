import { combineReducers } from 'redux';
import showsReducer from './shows/showReducer';

const rootReducer = combineReducers({
	show: showsReducer
});

export default rootReducer;
