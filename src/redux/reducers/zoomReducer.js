import * as types from '../actions/actionTypes';

export const zoomInitialState = { start: 80, end: 90 };

export default (state = zoomInitialState, action = {}) => {
	switch (action.type) {
	case types.ZOOM_CHANGED: return { ...state, ...action.payload };
	default: return state;
	}
};
