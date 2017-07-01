import * as types from './actionTypes';

export const setTimelineHoverStatus = (hoverStatus) => ({
	type: types.TIMELINE_HOVERSTATUS_CHANGED,
	payload: hoverStatus,
});

export const startDragging = () => ({
	type: types.TIMELINE_DRAG_STARTED,
});

export const stopDragging = () => ({
	type: types.TIMELINE_DRAG_STOPPED,
});
