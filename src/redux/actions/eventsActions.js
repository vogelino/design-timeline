import * as types from './actionTypes';

export const selectEvent = (id) => ({
	type: types.SELECT_EVENT,
	payload: { id },
});
