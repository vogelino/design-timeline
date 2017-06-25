import * as types from '../actions/actionTypes';

export const mouseInitialState = { mouseX: 0, mouseY: 0 };

export default (state = mouseInitialState, action = {}) => {
	switch (action.type) {
	case types.MOUSE_MOVED: return { ...action.payload };
	default: return state;
	}
};
