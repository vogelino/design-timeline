import * as types from './actionTypes';

export const setUiDimentions = (payload) => ({
	type: types.WINDOW_RESIZED,
	payload,
});
