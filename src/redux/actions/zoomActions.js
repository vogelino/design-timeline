import * as types from './actionTypes';

export const setZoomLevel = (zoomLevel) => ({
	type: types.SET_ZOOM_LEVEL,
	payload: zoomLevel,
});
