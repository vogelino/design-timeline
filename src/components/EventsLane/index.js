import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scaleTime } from 'd3-scale';
import EventsLane from './EventsLane';
import './EventsLane.css';

const ZOOM_BASE_PX = 4000;

export const EventsLanesComponent = ({
	events,
	categories,
	zoom: { level: zoomPercentageLevel },
}) => {
	const eventsByDate = events.sort((evt1, evt2) =>
		evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
	);
	const maxValue = ZOOM_BASE_PX * (zoomPercentageLevel / 100);
	const scaleFunc = scaleTime().domain([
		eventsByDate[0].data.startDate,
		eventsByDate[events.length - 1].data.startDate,
	]).range([0, maxValue]);

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
					width={maxValue}
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
		level: PropTypes.number.isRequired,
	}),
};

const mapStateToProps = ({ events, categories, zoom }) => ({ events, categories, zoom });
export default connect(mapStateToProps)(EventsLanesComponent);
