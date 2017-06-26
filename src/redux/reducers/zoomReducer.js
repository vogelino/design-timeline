import * as types from '../actions/actionTypes';

export const zoomInitialState = { start: 0, end: 100 };

export default (state = zoomInitialState, action = {}) => {
	switch (action.type) {
	case types.ZOOM_CHANGED: return { ...state, ...action.payload };
	default: return state;
	}
};
