/* global test, expect */
import * as types from './actionTypes';
import * as actions from './eventsActions';

test('selectEvent should return an action with payload', () => {
	expect(actions.selectEvent(2)).toEqual({
		type: types.SELECT_EVENT,
		payload: { id: 2 },
	});
});

test('setHoveredStatus should return an action with payload', () => {
	expect(actions.setHoveredStatus(2, true)).toEqual({
		type: types.SET_HOVERED_STATUS,
		payload: { id: 2, status: true },
	});
});
