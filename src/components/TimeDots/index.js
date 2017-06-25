import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/de';
import { getTimelineZoomOptions } from '../../helpers/timelineHelper';
import TimeDots from './TimeDots';
import './TimeDots.css';

export const TimeDotsContainerComponent = ({
	events,
	categories,
	zoom: { start: zoomStart, end: zoomEnd },
}) => {
	const eventsByDate = events.sort((evt1, evt2) =>
		evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
	);
	const { scaleFunc } = getTimelineZoomOptions({
		width: document.documentElement.clientWidth,
		zoomStart,
		zoomEnd,
		minDate: eventsByDate[0].data.startDate,
		maxDate: eventsByDate[events.length - 1].data.startDate,
	});
	const selectedEvent = events.find(({ state: { selected } }) => selected);

	if (!selectedEvent) {
		return null;
	}

	const selectedEventColor = categories.find(({ slug }) =>
		slug === selectedEvent.data.category
	).color;
	return (
		<TimeDots
			dots={[{
				key: selectedEvent.id,
				color: selectedEventColor,
				position: scaleFunc(selectedEvent.data.startDate) + 380,
				tooltipIcon: selectedEvent.data.type,
				tooltipContent: moment(selectedEvent.data.startDate).format('LL'),
			}]}
		/>
	);
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
};

const mapStateToProps = ({ events, categories, zoom }) =>
	({ events, categories, zoom });
export default connect(mapStateToProps)(TimeDotsContainerComponent);
