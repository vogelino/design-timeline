/* global test, expect */
import * as types from './actionTypes';
import * as actions from './zoomActions';

test('setZoomStart should return an action with payload', () => {
	expect(actions.setZoomStart(200)).toEqual({
		type: types.SET_ZOOM_START,
		payload: 200,
	});
});

test('setZoomEnd should return an action with payload', () => {
	expect(actions.setZoomEnd(400)).toEqual({
		type: types.SET_ZOOM_END,
		payload: 400,
	});
});
