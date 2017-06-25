/* global test, expect */
import * as types from './actionTypes';
import * as actions from './mouseActions';

test('setMouseCoordinates should return an action with payload', () => {
	expect(actions.setMouseCoordinates(200)).toEqual({
		type: types.MOUSE_MOVED,
		payload: 200,
	});
});
