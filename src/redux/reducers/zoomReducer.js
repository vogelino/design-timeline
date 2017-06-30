import * as types from '../actions/actionTypes';

export const zoomInitialState = { start: 40.948275862068975, end: 57.84482758620696 };

export default (state = zoomInitialState, action = {}) => {
	switch (action.type) {
	case types.ZOOM_CHANGED: return { ...state, ...action.payload };
	default: return state;
	}
};
