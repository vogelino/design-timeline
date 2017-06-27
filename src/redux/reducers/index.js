import events from './eventsReducer';
import categories from './categoriesReducer';
import zoom from './zoomReducer';
import mouse from './mouseReducer';
import ui from './uiReducer';

const rootReducer = (state = {}, action = {}) => ({
	events: events(state.events, action),
	categories: categories(state.categories, action),
	zoom: zoom(state.zoom, action),
	mouse: mouse(state.mouse, action),
	ui: ui(state.ui, action),
});

export default rootReducer;
