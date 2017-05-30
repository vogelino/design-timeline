/* global test, expect */
import * as types from './actionTypes';
import * as actions from './zoomActions';

test('setZoomLevel should return an action with payload', () => {
	expect(actions.setZoomLevel(200)).toEqual({
		type: types.SET_ZOOM_LEVEL,
		payload: 200,
	});
});
