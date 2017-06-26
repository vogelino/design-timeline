import * as types from '../actions/actionTypes';
import {
	SIDEBAR_WIDTH,
	TOPICS_LIST_WIDTH,
	HEADER_HEIGHT,
	MINIMAP_ZOOM,
} from '../constants/uiConstants';

export const uiInitialState = {
	windowWidth: 0,
	windowHeight: 0,
	timelineWidth: 0,
	timelineHeight: 0,
};

export default (state = uiInitialState, action = {}) => {
	switch (action.type) {
	case types.WINDOW_RESIZED: return {
		windowWidth: action.payload.width,
		windowHeight: action.payload.height,
		timelineWidth: action.payload.width - SIDEBAR_WIDTH - TOPICS_LIST_WIDTH,
		timelineHeight: action.payload.height - HEADER_HEIGHT - MINIMAP_ZOOM,
	};
	default: return state;
	}
};
