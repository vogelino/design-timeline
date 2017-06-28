import * as types from '../actions/actionTypes';
import { getTimelineZoomOptions } from '../../helpers/timelineHelper';

const initialState = {
	mainTimeline: {
		offset: 0,
		totalWidth: 0,
		minDate: new Date(),
		maxDate: new Date(),
	},
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
	case types.ZOOM_CHANGED:
	case types.WINDOW_RESIZED:
		return (() => {
			const eventsByDate = state.events.sort((evt1, evt2) =>
				evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
			);
			return getTimelineZoomOptions({
				zoomStart: state.zoom.start,
				zoomEnd: state.zoom.end,
				minDate: eventsByDate[0].data.startDate,
				maxDate: eventsByDate[eventsByDate.length - 1].data.startDate,
				width: state.ui.timelineWidth,
			});
		})();
	default: return state.mainTimeline;
	}
};
