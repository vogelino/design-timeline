import { scaleTime } from 'd3-scale';
import moment from 'moment';
import { mandatory } from './helperUtils';

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

const getTimelineUnit = (durationMs = mandatory('durationMs')) => {
	const momentDuration = moment.duration(durationMs);
	const yearAmount = momentDuration.asYears();

	const CENTURIES_YEARS_AMOUNT = 100;
	const HALFCENTURIES_YEARS_AMOUNT = 50;
	const DECADES_YEARS_AMOUNT = 10;
	const HALFDECADES_YEARS_AMOUNT = 5;

	if (yearAmount / CENTURIES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return {
			name: 'centuries',
			momentMethod: 'years',
			momentKey: 'y',
			momentUnitsAmount: CENTURIES_YEARS_AMOUNT,
		};
	}
	if (yearAmount / HALFCENTURIES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return {
			name: 'halfCenturies',
			momentMethod: 'years',
			momentKey: 'y',
			momentUnitsAmount: HALFCENTURIES_YEARS_AMOUNT,
		};
	}
	if (yearAmount / DECADES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return {
			name: 'decades',
			momentMethod: 'years',
			momentKey: 'y',
			momentUnitsAmount: DECADES_YEARS_AMOUNT,
		};
	}
	if (yearAmount / HALFDECADES_YEARS_AMOUNT > UNITS_PER_VIEW) {
		return {
			name: 'halfDecades',
			momentMethod: 'years',
			momentKey: 'y',
			momentUnitsAmount: HALFDECADES_YEARS_AMOUNT,
		};
	}
	if (yearAmount > UNITS_PER_VIEW) {
		return {
			name: 'years',
			momentMethod: 'years',
			momentKey: 'y',
			momentUnitsAmount: 1,
		};
	}
	const monthAmount = momentDuration.asMonths();
	if (monthAmount > UNITS_PER_VIEW) {
		return {
			name: 'months',
			momentMethod: 'months',
			momentKey: 'M',
			momentUnitsAmount: 1,
		};
	}
	const weekAmount = momentDuration.asWeeks();
	if (weekAmount > UNITS_PER_VIEW) {
		return {
			name: 'weeks',
			momentMethod: 'weekYear',
			momentKey: 'w',
			momentUnitsAmount: 1,
		};
	}
	return {
		name: 'days',
		momentMethod: 'day',
		momentKey: 'd',
		momentUnitsAmount: 1,
	};
};

export const getTimeLabels = ({
	scaleFunc = mandatory('scaleFunc'),
	offset = mandatory('offset'),
	totalWidth = mandatory('totalWidth'),
	zoomStart = mandatory('zoomStart'),
	zoomEnd = mandatory('zoomEnd'),
}) => {
	const totalStartDate = scaleFunc.invert(0);
	const visiblePortionPercentage = zoomEnd - zoomStart;
	const percentageFactor = (visiblePortionPercentage / HUNDRED_PERCENT);
	const visibleWidth = percentageFactor * totalWidth;
	const visibleStartDate = scaleFunc.invert(offset);
	const visibleEndDate = scaleFunc.invert(visibleWidth);
	const visibleDurationMs = visibleEndDate.valueOf() - visibleStartDate.valueOf();
	const { momentMethod, momentUnitsAmount, momentKey } = getTimelineUnit(visibleDurationMs);
	const startDate = moment(totalStartDate)[momentMethod]();
	const startLabelRawValue = Math.ceil(startDate / momentUnitsAmount) * momentUnitsAmount;
	const startLabelMomentDate = moment(String(startLabelRawValue));
	const startLabel = {
		rawValue: startLabelRawValue,
		momentDate: startLabelMomentDate,
		position: scaleFunc(startLabelMomentDate),
	};
	const unitsPerTimeline = Math.floor(UNITS_PER_VIEW / percentageFactor);
	const labels = Array.from(Array(unitsPerTimeline)).reduce((acc) => {
		const lastDate = acc[acc.length - 1].momentDate;
		const currentDate = lastDate
			.add(momentUnitsAmount, momentKey);
		return [...acc, {
			rawValue: currentDate[momentMethod](),
			momentDate: currentDate,
			position: scaleFunc(currentDate),
		}];
	}, [startLabel]);
	return labels;
};
