import * as types from '../actions/actionTypes';

export const zoomInitialState = { start: 49.124754302864645, end: 66.0213060270027 };

export default (state = zoomInitialState, action = {}) => {
	switch (action.type) {
	case types.ZOOM_CHANGED: return { ...state, ...action.payload };
	default: return state;
	}
};
