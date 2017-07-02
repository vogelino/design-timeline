import events from './eventsReducer';
import categories from './categoriesReducer';
import zoom from './zoomReducer';
import mouse from './mouseReducer';
import ui from './uiReducer';
import mainTimeline from './mainTimelineReducer';
import introScreen from './introScreenReducer';

const rootReducer = (state = {}, action = {}) => {
	const uiState = ui(state.ui, action);
	const newState = {
		events: events(state.events, action),
		categories: categories(state.categories, action),
		zoom: zoom(state.zoom, action),
		mouse: mouse(state.mouse, action),
		ui: uiState,
		mainTimeline: state.mainTimeline,
		introScreen: introScreen(state.introScreen, action)
	};
	return {
		...newState,
		mainTimeline: mainTimeline(newState, action),
	};
};

export default rootReducer;
