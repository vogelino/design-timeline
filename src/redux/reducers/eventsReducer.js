import * as types from '../actions/actionTypes';

export default (events = [], action = {}) => {
	switch (action.type) {
	case types.SELECT_EVENT: {
		return events.map((event) => ({
			...event,
			selected: action.payload.id === event.id,
		}));
	}
	default:
		return events;
	}
};
