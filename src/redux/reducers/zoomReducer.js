import * as types from '../actions/actionTypes';

export default (state = 100, action = {}) => {
	switch (action.type) {
	case types.SET_ZOOM_LEVEL: return action.payload;
	default: return state;
	}
};
