import { scaleTime } from 'd3-scale';
import { mandatory } from './helperUtils';

const HUNDRED_PERCENT = 100;

export const createScaleFunction = ({
	totalWidth = mandatory('totalWidth'),
	minDate = mandatory('minDate'),
	maxDate = mandatory('maxDate'),
	margin = 0,
}) => scaleTime().domain([minDate, maxDate]).range([0, totalWidth - (2 * margin)]);

export const getTimelineZoomOptions = ({
	zoomStart = mandatory('zoomStart'),
	zoomEnd = mandatory('zoomEnd'),
	minDate = mandatory('minDate'),
	maxDate = mandatory('maxDate'),
	width = mandatory('width'),
} = mandatory('main object')) => {
	const visiblePortionPercentage = zoomEnd - zoomStart;
	const totalWidthMultiplier = HUNDRED_PERCENT / visiblePortionPercentage;
	const totalWidth = (width * totalWidthMultiplier);
	const offset = ((totalWidth) * zoomStart) / HUNDRED_PERCENT;
	return { totalWidth, offset, minDate, maxDate };
};

export const getLanes = ({
	events = mandatory('events'),
	categories = mandatory('categories'),
	scaleFunc = mandatory('scaleFunc'),
	margin = 0,
}) => categories.map(({ title, slug, color }) => ({
	laneTitle: title,
	laneSlug: slug,
	laneEvents: events
		.filter(({ data: { category } }) => slug === category)
		.map(({
			id,
			data: {
				title: eventTitle,
				type,
				future,
				startDate,
			},
			state: {
				selected,
				hovered,
			},
		}) => ({
			id,
			type,
			future,
			selected,
			hovered,
			color,
			title: eventTitle,
			position: scaleFunc(startDate) + margin,
		})),
}));

export const getSelectedEvent = ({
	events = mandatory('events'),
	categories = mandatory('categories'),
}) => {
	const selectedEvent = events.find(({ state: { selected } }) => selected);
	if (!selectedEvent) return undefined;
	return {
		...selectedEvent,
		color: categories.find(
			({ slug }) => slug === selectedEvent.data.category
		).color,
	};
};
