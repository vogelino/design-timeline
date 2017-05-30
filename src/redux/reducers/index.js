import { combineReducers } from 'redux';
import events from './eventsReducer';
import categories from './categoriesReducer';
import zoom from './zoomReducer';

const rootReducer = combineReducers({
	events,
	categories,
	zoom,
});

export default rootReducer;
