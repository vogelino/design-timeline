import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/de';
import { createScaleFunction } from '../../helpers/timelineHelper';
import TimeDots from './TimeDots';
import { TIMELINE_MARGIN } from '../../redux/constants/uiConstants';
import './TimeDots.css';

export const TimeDotsContainerComponent = ({
	events,
	categories,
	mouseX,
	mainTimeline: { offset, totalWidth, minDate, maxDate, hovered, dragging },
}) => {
	if (dragging) return null;
	const timelineTotalWidth = totalWidth - (2 * TIMELINE_MARGIN);
	const scaleFunc = createScaleFunction({
		totalWidth: timelineTotalWidth,
		minDate,
		maxDate,
	});

	const selectedEvent = events.find(({ state: { selected } }) => selected);

	const now = Date.now();
	const publicationDate = new Date('2017-06-28');
	const dots = [
		{
			key: 'publication',
			color: '#0087F2',
			position: scaleFunc(publicationDate) + TIMELINE_MARGIN,
			tooltipContent: 'Publication',
			show: false,
			offset,
		},
		{
			key: 'now',
			color: '#0087F2',
			position: scaleFunc(now) + TIMELINE_MARGIN,
			tooltipContent: 'Now',
			show: false,
			offset,
		},
	];

	if (hovered) {
		dots.push({
			key: 'mousePointer',
			color: '#0087F2',
			position: mouseX + offset,
			tooltipContent: moment(
				scaleFunc.invert(-TIMELINE_MARGIN + mouseX + offset)
			).format('LL'),
			show: true,
			offset,
		});
	}

	if (selectedEvent) {
		const selectedEventColor = categories.find(({ slug }) =>
			slug === selectedEvent.data.category
		).color;

		dots.push({
			key: selectedEvent.id,
			color: selectedEventColor,
			position: scaleFunc(selectedEvent.data.startDate) + TIMELINE_MARGIN,
			tooltipContent: moment(selectedEvent.data.startDate).format('LL'),
			offset,
		});
	}
	return <TimeDots dots={dots} />;
};

TimeDotsContainerComponent.defaultProps = {
	events: [],
	categories: [],
	mouseX: 0,
	mainTimeline: {
		hovered: false,
		offset: 0,
		totalWidth: 1000,
		minDate: new Date(),
		maxDate: new Date(),
	},
};

TimeDotsContainerComponent.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			data: PropTypes.shape({
				title: PropTypes.string.isRequired,
			}).isRequired,
			state: PropTypes.shape({
				selected: PropTypes.bool.isRequired,
				hovered: PropTypes.bool.isRequired,
			}).isRequired,
		}),
	),
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			color: PropTypes.string.isRequired,
		}),
	),
	mouseX: PropTypes.number,
	mainTimeline: PropTypes.shape({
		hovered: PropTypes.bool,
		offset: PropTypes.number,
		totalWidth: PropTypes.number,
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
	}),
};

const mapStateToProps = ({
	events,
	categories,
	mouse: { mouseX, mouseY },
	mainTimeline,
}) => ({ events, categories, mouseX, mouseY, mainTimeline });
export default connect(mapStateToProps)(TimeDotsContainerComponent);
