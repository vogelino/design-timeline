import * as types from './actionTypes';

export const setUiDimensions = (payload) => ({
	type: types.WINDOW_RESIZED,
	payload,
});
