import * as types from './actionTypes';

export const selectEvent = (id) => ({
	type: types.SELECT_EVENT,
	payload: { id },
});

export const setHoveredStatus = (id, status) => ({
	type: types.SET_HOVERED_STATUS,
	payload: { id, status },
});
