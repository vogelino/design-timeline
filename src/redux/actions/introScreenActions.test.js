/* global test, expect */
import * as types from './actionTypes';
import { showIntroScreen, hideIntroScreen } from './introScreenActions';

test('showIntroScreen should return an action with payload: true', () => {
	expect(showIntroScreen()).toEqual({
		type: types.INTRO_SCREEN_VISIBILITY_CHANGED,
		payload: true,
	});
});

test('hideIntroScreen should return an action with payload: false', () => {
	expect(hideIntroScreen()).toEqual({
		type: types.INTRO_SCREEN_VISIBILITY_CHANGED,
		payload: false,
	});
});
