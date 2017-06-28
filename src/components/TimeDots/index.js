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
	mainTimeline: { offset, totalWidth, minDate, maxDate },
}) => {
	const timelineWidth = totalWidth - (2 * TIMELINE_MARGIN);
	const scaleFunc = createScaleFunction({ totalWidth: timelineWidth, minDate, maxDate });

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
	mouseX: PropTypes.number.isRequired,
	mainTimeline: PropTypes.shape({
		offset: PropTypes.number.isRequired,
		totalWidth: PropTypes.number.isRequired,
		minDate: PropTypes.instanceOf(Date).isRequired,
		maxDate: PropTypes.instanceOf(Date).isRequired,
	}),
};

const mapStateToProps = ({
	events,
	categories,
	mouse: { mouseX },
	mainTimeline,
}) => ({ events, categories, mouseX, mainTimeline });
export default connect(mapStateToProps)(TimeDotsContainerComponent);
