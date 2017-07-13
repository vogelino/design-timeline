import * as types from './actionTypes';

export const showIntroScreen = () => ({
	type: types.INTRO_SCREEN_VISIBILITY_CHANGED,
	payload: true,
});

export const hideIntroScreen = () => ({
	type: types.INTRO_SCREEN_VISIBILITY_CHANGED,
	payload: false,
});
