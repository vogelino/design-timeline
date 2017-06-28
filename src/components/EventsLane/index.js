import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import throttle from 'throttle-debounce/throttle';
import { createScaleFunction } from '../../helpers/timelineHelper';
import * as mouseActions from '../../redux/actions/mouseActions';
import EventsLane from './EventsLane';
import SelectionMarker from './SelectionMarker';
import {
	SIDEBAR_WIDTH,
	HEADER_HEIGHT,
	TIMELINE_MARGIN,
} from '../../redux/constants/uiConstants';
import './EventsLane.css';

export const EventsLanesComponent = ({
	events,
	categories,
	actions: { setMouseCoordinates },
	mainTimeline: { offset, totalWidth, minDate, maxDate },
}) => {
	const scaleFunc = createScaleFunction({ totalWidth, minDate, maxDate });
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
			onMouseMove={({ clientX, clientY }) =>
				throttleSetMouseCoordinates({
					mouseX: clientX - SIDEBAR_WIDTH,
					mouseY: clientY - HEADER_HEIGHT,
				})
			}
		>
			<div
				className="events-lanes_wrapper"
				style={{
					transform: `translateX(-${offset}px)`,
					width: totalWidth + (TIMELINE_MARGIN * 2),
				}}
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
	actions: PropTypes.shape({
		setMouseCoordinates: PropTypes.func.isRequired,
	}).isRequired,
	mainTimeline: PropTypes.shape({
		offset: PropTypes.number.isRequired,
		totalWidth: PropTypes.number.isRequired,
		minDate: PropTypes.instanceOf(Date).isRequired,
		maxDate: PropTypes.instanceOf(Date).isRequired,
	}),
};

const mapStateToProps = ({ events, categories, mainTimeline }) =>
	({ events, categories, mainTimeline });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(mouseActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventsLanesComponent);
