import { scaleTime } from 'd3-scale';

const mandatory = (parameterName) => {
	throw new Error(`Missing mandatory parmeter: "${parameterName}!!"`);
};

const createScaleFunction = ({
	totalWidth = mandatory('totalWidth'),
	minDate = mandatory('minDate'),
	maxDate = mandatory('maxDate'),
}) => scaleTime().domain([minDate, maxDate]).range([0, totalWidth]);

export const getTimelineZoomOptions = ({
	zoomStart = mandatory('zoomStart'),
	zoomEnd = mandatory('zoomEnd'),
	minDate = mandatory('minDate'),
	maxDate = mandatory('maxDate'),
	width = mandatory('width'),
} = mandatory('main object')) => {
	const HUNDRED_PERCENT = 100;
	const visiblePortionPercentage = zoomEnd - zoomStart;
	const totalWidthMultiplier = HUNDRED_PERCENT / visiblePortionPercentage;
	const totalWidth = width * totalWidthMultiplier;
	const offset = (totalWidth * zoomStart) / HUNDRED_PERCENT;
	const scaleFunc = createScaleFunction({
		minDate, maxDate, totalWidth,
	});
	return { width, totalWidth, offset, scaleFunc };
};
