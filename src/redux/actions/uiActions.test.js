/* global test, expect */
import * as types from './actionTypes';
import * as actions from './uiActions';

test('setUiDimentions should return an action with payload', () => {
	expect(actions.setUiDimentions(200)).toEqual({
		type: types.WINDOW_RESIZED,
		payload: 200,
	});
});
