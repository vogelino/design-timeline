import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import throttle from 'throttle-debounce/throttle';
import { getTimelineZoomOptions } from '../../helpers/timelineHelper';
import * as mouseActions from '../../redux/actions/mouseActions';
import EventsLane from './EventsLane';
import SelectionMarker from './SelectionMarker';
import './EventsLane.css';

export const EventsLanesComponent = ({
	events,
	categories,
	zoom: { start: zoomStart, end: zoomEnd },
	actions: { setMouseCoordinates },
	ui: { timelineWidth },
}) => {
	const eventsByDate = events.sort((evt1, evt2) =>
		evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
	);
	const { scaleFunc, totalWidth } = getTimelineZoomOptions({
		width: timelineWidth,
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
	const selectedEvent = events.find(({ state: { selected } }) => selected);
	const selectedEventColor = selectedEvent ? categories.find(({ slug }) =>
		slug === selectedEvent.data.category
	).color : 'transparent';
	const throttleSetMouseCoordinates = throttle(200, setMouseCoordinates);
	return (
		<div
			className="events-lanes"
			onMouseMove={({ clientX: mouseX, clientY: mouseY }) =>
				throttleSetMouseCoordinates({ mouseX, mouseY })}
		>
			<div className="events-lanes_lanes">
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
			{
				selectedEvent ?
					<SelectionMarker
						date={selectedEvent.data.startDate}
						color={selectedEventColor}
						scaleFunc={scaleFunc}
					/> : null
			}
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
	}).isRequired,
	actions: PropTypes.shape({
		setMouseCoordinates: PropTypes.func.isRequired,
	}).isRequired,
	ui: PropTypes.shape({
		timelineWidth: PropTypes.number.isRequired,
	}).isRequired,
};

const mapStateToProps = ({ events, categories, zoom, ui }) =>
	({ events, categories, zoom, ui });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(mouseActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventsLanesComponent);
