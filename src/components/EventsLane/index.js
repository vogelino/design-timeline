import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import throttle from 'throttle-debounce/throttle';
import * as mouseActions from '../../redux/actions/mouseActions';
import * as eventsActions from '../../redux/actions/eventsActions';
import EventsLane from './EventsLane';
import SelectionMarker from './SelectionMarker';
import {
	createScaleFunction,
	getLanes,
	getSelectedEvent,
	getTimeLabels,
} from '../../helpers/timelineHelper';
import {
	SIDEBAR_WIDTH,
	HEADER_HEIGHT,
	TIMELINE_MARGIN,
} from '../../redux/constants/uiConstants';
import './EventsLane.css';

export const EventsLanesComponent = ({
	events,
	categories,
	actions: { setMouseCoordinates, setHoveredStatus, selectEvent },
	mainTimeline: { offset, totalWidth, minDate, maxDate },
	zoom: { start: zoomStart, end: zoomEnd },
}) => {
	const timelineWidth = totalWidth - (2 * TIMELINE_MARGIN);
	const scaleFunc = createScaleFunction({ totalWidth: timelineWidth, minDate, maxDate });
	const lanes = getLanes({ categories, events, scaleFunc, margin: TIMELINE_MARGIN });
	const timeLabels = getTimeLabels({
		totalWidth: timelineWidth,
		scaleFunc,
		offset,
		zoomStart,
		zoomEnd,
	});
	const selectedEvent = getSelectedEvent({ categories, events });
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
					width: totalWidth,
				}}
			>
				<div
					className="events-lane_dateaxis"
					style={{
						transform: `translateX(-${offset}px)`,
						width: totalWidth,
					}}
				>
					{timeLabels.map((timeLabel) => (
						<span
							key={timeLabel.rawValue}
							className="events-lane_datelabel"
							style={{ left: timeLabel.position }}
						>
							{timeLabel.rawValue}
						</span>
					))}
				</div>
				<div className="events-lanes_lanes">
					{lanes.map(({ laneSlug, laneEvents }) => (
						<EventsLane
							key={laneSlug}
							className={laneSlug}
							events={laneEvents.map((event) => ({
								...event,
								onClick: () => selectEvent(event.id),
								onMouseEnter: () => setHoveredStatus(event.id, true),
								onMouseLeave: () => setHoveredStatus(event.id, false),
							}))}
							width={totalWidth}
						/>
					))}
				</div>
				{
					selectedEvent ?
						<SelectionMarker
							date={selectedEvent.data.startDate}
							color={selectedEvent.color}
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
		selectEvent: PropTypes.func.isRequired,
		setHoveredStatus: PropTypes.func.isRequired,
	}).isRequired,
	mainTimeline: PropTypes.shape({
		offset: PropTypes.number.isRequired,
		totalWidth: PropTypes.number.isRequired,
		minDate: PropTypes.instanceOf(Date).isRequired,
		maxDate: PropTypes.instanceOf(Date).isRequired,
	}),
	zoom: PropTypes.shape({
		start: PropTypes.number.isRequired,
		end: PropTypes.number.isRequired,
	}).isRequired,
};

const mapStateToProps = ({ events, categories, mainTimeline, zoom }) =>
	({ events, categories, mainTimeline, zoom });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...mouseActions,
		...eventsActions,
	}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventsLanesComponent);
