import { combineReducers } from 'redux';
import events from './eventsReducer';
import categories from './categoriesReducer';
import zoom from './zoomReducer';
import mouse from './mouseReducer';

const rootReducer = combineReducers({
	events,
	categories,
	zoom,
	mouse,
});

export default rootReducer;
