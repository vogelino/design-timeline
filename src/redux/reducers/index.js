import events from './eventsReducer';
import categories from './categoriesReducer';
import zoom from './zoomReducer';
import mouse from './mouseReducer';
import ui from './uiReducer';
import mainTimeline from './mainTimelineReducer';

const rootReducer = (state = {}, action = {}) => {
	const uiState = ui(state.ui, action);
	const newState = {
		events: events(state.events, action),
		categories: categories(state.categories, action),
		zoom: zoom(state.zoom, action),
		mouse: mouse(state.mouse, action),
		ui: uiState,
		mainTimeline: state.mainTimeline,
	};
	return {
		...newState,
		mainTimeline: mainTimeline(newState, action),
	};
};

export default rootReducer;
