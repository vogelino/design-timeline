import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventsLane from './EventsLane';
import { getLanes } from '../../helpers/timelineHelper';
import { TIMELINE_MARGIN } from '../../redux/constants/uiConstants';

class EventsLanes extends Component {
	shouldComponentUpdate(nextProps) {
		const { totalWidth, events } = this.props;
		return totalWidth !== nextProps.totalWidth ||
			events !== nextProps.events;
	}
	render() {
		const {
			categories,
			events,
			scaleFunc,
			selectEvent,
			setHoveredStatus,
			totalWidth,
		} = this.props;
		const lanes = getLanes({ categories, events, scaleFunc, margin: TIMELINE_MARGIN });
		return (
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
		);
	}
}

EventsLanes.defaultProps = {
	categories: [],
	events: [],
	scaleFunc: (x) => x,
	selectEvent: (x) => x,
	setHoveredStatus: (x) => x,
	totalWidth: 1000,
};

EventsLanes.propTypes = {
	categories: PropTypes.array,
	events: PropTypes.array,
	scaleFunc: PropTypes.func,
	selectEvent: PropTypes.func,
	setHoveredStatus: PropTypes.func,
	totalWidth: PropTypes.number,
};

export default EventsLanes;
