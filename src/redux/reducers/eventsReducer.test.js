/* global test, expect */
import * as types from '../actions/actionTypes';
import eventsReducer from './eventsReducer';
import fakeEvents from '../state/fakeEvents';

test('calling eventsReducer without arguments should return the initial state', () => {
	expect(eventsReducer()).toEqual([]);
});

test('calling eventsReducer without action should return the state', () => {
	expect(eventsReducer(fakeEvents)).toBe(fakeEvents);
});

test('SELECT_EVENT returns a new list of events with only one selected event', () => {
	const eventsBefore = [
		{ id: 1, state: { selected: false } },
		{ id: 2, state: { selected: true } },
	];
	const eventsAfter = eventsReducer(eventsBefore, {
		type: types.SELECT_EVENT,
		payload: { id: 1 },
	});
	expect(eventsAfter[0].state.selected).toBe(true);
	expect(eventsAfter[1].state.selected).toBe(false);
});

test('SET_HOVERED_STATUS:true returns a new list of events with only one hovered event', () => {
	const eventsBefore = [
		{ id: 1, state: { hovered: false } },
		{ id: 2, state: { hovered: true } },
	];
	const eventsAfter = eventsReducer(eventsBefore, {
		type: types.SET_HOVERED_STATUS,
		payload: { id: 1, status: true },
	});
	expect(eventsAfter[0].state.hovered).toBe(true);
	expect(eventsAfter[1].state.hovered).toBe(false);
});
