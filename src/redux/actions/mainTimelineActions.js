import * as types from './actionTypes';

export const setTimelineHoverStatus = (hoverStatus) => ({
	type: types.TIMELINE_HOVERSTATUS_CHANGED,
	payload: hoverStatus,
});
