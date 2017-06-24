import * as types from '../actions/actionTypes';

export const zoomInitialState = { start: 0, end: 100 };

export default (state = zoomInitialState, action = {}) => {
	switch (action.type) {
	case types.SET_ZOOM_START: return { start: action.payload };
	case types.SET_ZOOM_END: return { end: action.payload };
	default: return state;
	}
};
