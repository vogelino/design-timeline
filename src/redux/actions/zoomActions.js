import * as types from './actionTypes';

export const setZoomStart = (payload) => ({
	type: types.SET_ZOOM_START,
	payload,
});

export const setZoomEnd = (payload) => ({
	type: types.SET_ZOOM_END,
	payload,
});
