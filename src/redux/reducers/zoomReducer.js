import * as types from '../actions/actionTypes';

export default (state = { level: 100 }, action = {}) => {
	switch (action.type) {
	case types.SET_ZOOM_LEVEL: return { level: action.payload };
	default: return state;
	}
};
