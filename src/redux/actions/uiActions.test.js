/* global test, expect */
import * as types from './actionTypes';
import * as actions from './uiActions';

test('setUiDimensions should return an action with payload', () => {
	expect(actions.setUiDimensions(200)).toEqual({
		type: types.WINDOW_RESIZED,
		payload: 200,
	});
});
