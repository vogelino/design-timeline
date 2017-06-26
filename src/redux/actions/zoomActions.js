import * as types from './actionTypes';

export const setZoom = (payload) => ({
	type: types.ZOOM_CHANGED,
	payload,
});
