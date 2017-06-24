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

it('should return the new zoom start when called with SET_ZOOM_START', () => {
	expect(zoomReducer(zoomInitialState, {
		type: types.SET_ZOOM_START,
		payload: 200,
	}).start).toBe(200);
});

it('should return the new zoom end when called with SET_ZOOM_END', () => {
	expect(zoomReducer(zoomInitialState, {
		type: types.SET_ZOOM_END,
		payload: 200,
	}).end).toBe(200);
});
