import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/de';
import { getTimelineZoomOptions } from '../../helpers/timelineHelper';
import TimeDots from './TimeDots';
import { TIMELINE_MARGIN } from '../../redux/constants/uiConstants';
import './TimeDots.css';

export const TimeDotsContainerComponent = ({
	events,
	categories,
	zoom: { start: zoomStart, end: zoomEnd },
	mouseX,
	ui: { timelineWidth },
}) => {
	const eventsByDate = events.sort((evt1, evt2) =>
		evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
	);
	const { scaleFunc, offset } = getTimelineZoomOptions({
		width: timelineWidth,
		zoomStart,
		zoomEnd,
		minDate: eventsByDate[0].data.startDate,
		maxDate: eventsByDate[events.length - 1].data.startDate,
	});
	const selectedEvent = events.find(({ state: { selected } }) => selected);

	const dots = [{
		key: 'mousePointer',
		color: '#0087F2',
		position: mouseX + offset,
		tooltipContent: moment(
			scaleFunc.invert(-TIMELINE_MARGIN + mouseX + offset)
		).format('LL'),
		show: true,
		offset,
	}];

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
	).isRequired,
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			color: PropTypes.string.isRequired,
		}),
	).isRequired,
	zoom: PropTypes.shape({
		start: PropTypes.number.isRequired,
		end: PropTypes.number.isRequired,
	}).isRequired,
	mouseX: PropTypes.number.isRequired,
	ui: PropTypes.shape({
		timelineWidth: PropTypes.number.isRequired,
	}).isRequired,
};

const mapStateToProps = ({ events, categories, zoom, mouse: { mouseX }, ui }) =>
	({ events, categories, zoom, mouseX, ui });
export default connect(mapStateToProps)(TimeDotsContainerComponent);
