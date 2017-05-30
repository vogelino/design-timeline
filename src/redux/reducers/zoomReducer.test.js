/* global it, expect */
import * as types from '../actions/actionTypes';
import zoomReducer from './zoomReducer';

it('should return the initial state when given no params', () => {
	expect(zoomReducer()).toBe(100);
});

it('should return the state when the action in not recognized', () => {
	expect(zoomReducer('hello')).toBe('hello');
});

it('should return the new zoom level when called with SET_ZOOM_LEVEL', () => {
	expect(zoomReducer(200, {
		type: types.SET_ZOOM_LEVEL,
		payload: 200,
	})).toBe(200);
});
