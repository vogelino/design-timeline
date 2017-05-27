import * as types from '../actions/actionTypes';

export default (events = [], action = {}) => {
	switch (action.type) {
	case types.SELECT_EVENT: {
		return events.map((event) => ({
			...event,
			state: {
				...event.state,
				selected: action.payload.id === event.id,
			},
		}));
	}
	case types.SET_HOVERED_STATUS:
		return events.map((event) => ({
			...event,
			state: {
				...event.state,
				hovered: action.payload.id === event.id &&
					action.payload.status,
			},
		}));
	default:
		return events;
	}
};
