/* global test, expect */
import * as types from './actionTypes';
import { setZoom } from './zoomActions';

test('setZoomStart should return an action with payload', () => {
	expect(setZoom(200)).toEqual({
		type: types.ZOOM_CHANGED,
		payload: 200,
	});
});
