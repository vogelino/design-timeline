/* global it, expect */
import * as types from '../actions/actionTypes';
import mouseReducer, { mouseInitialState } from './mouseReducer';

it('should return the initial state when given no params', () => {
	expect(mouseReducer().mouseX).toBe(0);
	expect(mouseReducer().mouseY).toBe(0);
});

it('should return the state when the action in not recognized', () => {
	expect(mouseReducer('hello')).toBe('hello');
});

it('should return the new mouse coordinates when called with MOUSE_MOVED', () => {
	const expectedState = { mouseX: 100, mouseY: 100 };
	expect(mouseReducer(mouseInitialState, {
		type: types.MOUSE_MOVED,
		payload: expectedState,
	})).toEqual(expectedState);
});
