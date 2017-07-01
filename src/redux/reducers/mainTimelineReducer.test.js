/* global it, expect */
import mainTimelineReducer, { mainTimelineInitialState } from './mainTimelineReducer';

it('should return the initial state when given no params', () => {
	expect(Object.keys(mainTimelineInitialState.mainTimeline))
		.toMatchObject(Object.keys(mainTimelineReducer()));
});

it('should return the content of the mainTimeline key when the action in not recognized', () => {
	const state = { mainTimeline: 'hello' };
	expect(mainTimelineReducer(state, {
		type: 'UNKNOWN',
		payload: 200,
	})).toEqual(state.mainTimeline);
});
