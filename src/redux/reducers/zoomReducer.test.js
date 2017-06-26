/* global it, expect */
import * as types from '../actions/actionTypes';
import zoomReducer, { zoomInitialState } from './zoomReducer';

it('should return the initial state when given no params', () => {
	expect(zoomReducer().start).toBe(0);
	expect(zoomReducer().end).toBe(100);
});

it('should return the state when the action in not recognized', () => {
	expect(zoomReducer('hello')).toBe('hello');
});

it('should return the new zoom start when called with ZOOM_CHANGED', () => {
	expect(zoomReducer(zoomInitialState, {
		type: types.ZOOM_CHANGED,
		payload: { start: 200 },
	}).start).toBe(200);
});
