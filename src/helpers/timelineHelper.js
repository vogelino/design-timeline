import { scaleTime } from 'd3-scale';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { mandatory } from './helperUtils';
import { TIMELINE_MARGIN } from '../redux/constants/uiConstants';

const moment = extendMoment(Moment);

const HUNDRED_PERCENT = 100;
const UNITS_PER_VIEW = 10;

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

const createUnit = (unit, formatter) => (unitsAmount) => ({
	unit,
	unitsAmount,
	formatter,
});

const getTimelineUnit = (visibleDuration = mandatory('visibleDuration')) => {
	const yearAmount = visibleDuration.asYears();
	const createYearUnit = createUnit('year', (m) => m.year());

	const CENTURIES_YEARS_AMOUNT = 100;
	const HALFCENTURIES_YEARS_AMOUNT = 50;
	const DECADES_YEARS_AMOUNT = 10;
	const HALFDECADES_YEARS_AMOUNT = 5;
	const PAIR_YEARS_AMOUNT = 2;

	if (yearAmount / CENTURIES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return createYearUnit(CENTURIES_YEARS_AMOUNT);
	}
	if (yearAmount / HALFCENTURIES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return createYearUnit(HALFCENTURIES_YEARS_AMOUNT);
	}
	if (yearAmount / DECADES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return createYearUnit(DECADES_YEARS_AMOUNT);
	}
	if (yearAmount / HALFDECADES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return createYearUnit(HALFDECADES_YEARS_AMOUNT);
	}
	if (yearAmount / PAIR_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return createYearUnit(PAIR_YEARS_AMOUNT);
	}
	if (yearAmount > UNITS_PER_VIEW) {
		return createYearUnit(1);
	}
	return createUnit('month', (m) => m.format('MMM YYYY'))(1);
};

export const getTimeLabels = ({
	scaleFunc = mandatory('scaleFunc'),
	offset = mandatory('offset'),
	totalWidth = mandatory('totalWidth'),
	visibleWidth = mandatory('visibleWidth'),
}) => {
	const totalStartDate = scaleFunc.invert(0);
	const totalEndDate = scaleFunc.invert(totalWidth);
	const visibleStartDate = scaleFunc.invert(offset - TIMELINE_MARGIN);
	const visibleEndDate = scaleFunc.invert(-TIMELINE_MARGIN + visibleWidth + offset);
	const visibleDiff = moment(visibleEndDate).diff(moment(visibleStartDate), 'milliseconds');
	const visibleDuration = moment.duration(Math.abs(visibleDiff));
	const { unit, unitsAmount, formatter } = getTimelineUnit(visibleDuration);
	const startDate = moment(totalStartDate).year();
	const startLabelRawValue = Math.ceil(startDate / unitsAmount) * unitsAmount;
	const startLabelMomentDate = moment(String(startLabelRawValue));
	const endDate = moment(totalEndDate).year();
	const endLabelRawValue = Math.ceil(endDate / unitsAmount) * unitsAmount;
	const endLabelMomentDate = moment(String(endLabelRawValue));

	const datesRange = moment.range(startLabelMomentDate, endLabelMomentDate);
	return Array
		.from(datesRange.by(unit, { step: unitsAmount }))
		.map((m) => ({
			text: formatter(m),
			moment: m,
			position: scaleFunc(m.toDate()),
		}));
};
