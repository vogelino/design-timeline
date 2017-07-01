import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import throttle from 'throttle-debounce/throttle';
import { DraggableCore } from 'react-draggable';
import * as mouseActions from '../../redux/actions/mouseActions';
import * as eventsActions from '../../redux/actions/eventsActions';
import * as mainTimelineActions from '../../redux/actions/mainTimelineActions';
import * as zoomActions from '../../redux/actions/zoomActions';
import SelectionMarker from './SelectionMarker';
import EventsLaneTimeAxis from './EventsLaneTimeAxis';
import EventsLanes from './EventsLanes';
import { createScaleFunction, getSelectedEvent, getNewStartEndFromDelta } from '../../helpers/timelineHelper';
import { SIDEBAR_WIDTH, HEADER_HEIGHT, TIMELINE_MARGIN } from '../../redux/constants/uiConstants';
import './EventsLane.css';

const DRAG_GRID_SIZE = 1;
export const EventsLanesComponent = ({
	events,
	categories,
	actions: {
		setMouseCoordinates,
		setHoveredStatus,
		selectEvent,
		setTimelineHoverStatus,
		setZoom,
		startDragging,
		stopDragging,
	},
	mainTimeline: { offset, totalWidth, minDate, maxDate },
	ui: { timelineWidth: visibleWidth },
	zoom: { start: startPercentage, end: endPercentage },
}) => {
	const timelineTotalWidth = totalWidth - (2 * TIMELINE_MARGIN);
	const scaleFunc = createScaleFunction({
		totalWidth: timelineTotalWidth,
		minDate,
		maxDate,
	});
	const selectedEvent = getSelectedEvent({ categories, events });
	const throttleSetMouseCoordinates = throttle(200, setMouseCoordinates);
	const getFutureZone = (date, classPrefix) => (
		<div
			className={`events-lanes_${classPrefix}`}
			style={{
				width: totalWidth - scaleFunc(date) - TIMELINE_MARGIN,
			}}
		/>
	);
	return (
		<div
			className="events-lanes"
			onMouseEnter={() => setTimelineHoverStatus(true)}
			onMouseLeave={() => setTimelineHoverStatus(false)}
			onMouseMove={({ clientX, clientY }) =>
				throttleSetMouseCoordinates({
					mouseX: clientX - SIDEBAR_WIDTH,
					mouseY: clientY - HEADER_HEIGHT,
				})
			}
		>
			<DraggableCore
				grid={[DRAG_GRID_SIZE, 0]}
				onStart={startDragging}
				onStop={stopDragging}
				onDrag={(evt, { deltaX }) => {
					const getNewZoom = getNewStartEndFromDelta({
						startPercentage,
						visiblePercentage: endPercentage - startPercentage,
						containerWidth: timelineTotalWidth,
					});
					setZoom(getNewZoom(deltaX * -1));
				}}
			>
				<div
					className="events-lanes_wrapper"
					style={{
						transform: `translateX(-${offset}px)`,
						width: totalWidth,
					}}
				>
					{getFutureZone(new Date('2017-06-28'), 'publication')}
					{getFutureZone(new Date(), 'future')}
					<EventsLaneTimeAxis
						scaleFunc={scaleFunc}
						totalWidth={timelineTotalWidth}
						offset={offset}
						visibleWidth={visibleWidth}
					/>
					<EventsLanes
						categories={categories}
						events={events}
						scaleFunc={scaleFunc}
						selectEvent={selectEvent}
						setHoveredStatus={setHoveredStatus}
						totalWidth={totalWidth}
					/>
					{
						selectedEvent ?
							<SelectionMarker
								date={selectedEvent.data.startDate}
								color={selectedEvent.color}
								scaleFunc={scaleFunc}
							/> : null
					}
				</div>
			</DraggableCore>
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
		setTimelineHoverStatus: PropTypes.func.isRequired,
		setZoom: PropTypes.func.isRequired,
		startDragging: PropTypes.func.isRequired,
		stopDragging: PropTypes.func.isRequired,
	}).isRequired,
	mainTimeline: PropTypes.shape({
		offset: PropTypes.number.isRequired,
		totalWidth: PropTypes.number.isRequired,
		minDate: PropTypes.instanceOf(Date).isRequired,
		maxDate: PropTypes.instanceOf(Date).isRequired,
	}),
	ui: PropTypes.shape({
		timelineWidth: PropTypes.number.isRequired,
	}).isRequired,
	zoom: PropTypes.shape({
		start: PropTypes.number.isRequired,
		end: PropTypes.number.isRequired,
	}).isRequired,
};

const mapStateToProps = ({ events, categories, mainTimeline, ui, zoom }) =>
	({ events, categories, mainTimeline, ui, zoom });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...mouseActions,
		...eventsActions,
		...mainTimelineActions,
		...zoomActions,
	}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventsLanesComponent);
