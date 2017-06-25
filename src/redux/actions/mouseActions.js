import * as types from './actionTypes';

export const setMouseCoordinates = (payload) => ({
	type: types.MOUSE_MOVED,
	payload,
});
