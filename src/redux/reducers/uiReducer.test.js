/* global test, expect */
import uiReducer, { uiInitialState } from './uiReducer';
import { setUiDimentions } from '../actions/uiActions';
import {
	SIDEBAR_WIDTH,
	TOPICS_LIST_WIDTH,
	HEADER_HEIGHT,
	MINIMAP_ZOOM,
} from '../constants/uiConstants';

test('calling uiReducer without arguments should return the initialState', () => {
	expect(uiReducer()).toEqual(uiInitialState);
});

test('calling uiReducer with arguments should return the arguments', () => {
	const args = 'ahahahaha';
	expect(uiReducer(args)).toBe(args);
});

test('uiReducer should return calculated timeline size', () => {
	const actionPayload = {
		width: 1000,
		height: 1000,
	};
	const action = setUiDimentions(actionPayload);
	const expectedState = {
		windowWidth: actionPayload.width,
		windowHeight: actionPayload.height,
		timelineWidth: actionPayload.width - SIDEBAR_WIDTH - TOPICS_LIST_WIDTH,
		timelineHeight: actionPayload.height - HEADER_HEIGHT - MINIMAP_ZOOM,
	};
	expect(uiReducer(undefined, action)).toEqual(expectedState);
});
