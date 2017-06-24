import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimelineZoomOptions } from '../../helpers/timelineHelper';
import EventsLane from './EventsLane';
import './EventsLane.css';

export const EventsLanesComponent = ({
	events,
	categories,
	zoom: { start: zoomStart, end: zoomEnd },
}) => {
	const eventsByDate = events.sort((evt1, evt2) =>
		evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
	);
	const { scaleFunc, totalWidth } = getTimelineZoomOptions({
		width: document.documentElement.clientWidth,
		zoomStart,
		zoomEnd,
		minDate: eventsByDate[0].data.startDate,
		maxDate: eventsByDate[events.length - 1].data.startDate,
	});

	const lanes = categories.map((category) => ({
		laneTitle: category.title,
		laneSlug: category.slug,
		laneColor: category.color,
		laneEvents: events.filter(({ data: { category: eventCategory } }) =>
			category.slug === eventCategory),
	}));
	return (
		<div className="events-lanes">
			{lanes.map(({ laneSlug, laneColor, laneEvents }) => (
				<EventsLane
					key={laneSlug}
					className={laneSlug}
					events={laneEvents}
					scaleFunc={scaleFunc}
					color={laneColor}
					width={totalWidth}
				/>
			))}
		</div>
	);
};

EventsLanesComponent.propTypes = {
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
	}).isRequired
};

const mapStateToProps = ({ events, categories, zoom }) => ({ events, categories, zoom });
export default connect(mapStateToProps)(EventsLanesComponent);
