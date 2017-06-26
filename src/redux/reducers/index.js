import { combineReducers } from 'redux';
import events from './eventsReducer';
import categories from './categoriesReducer';
import zoom from './zoomReducer';
import mouse from './mouseReducer';
import ui from './uiReducer';

const rootReducer = combineReducers({
	events,
	categories,
	zoom,
	mouse,
	ui,
});

export default rootReducer;
