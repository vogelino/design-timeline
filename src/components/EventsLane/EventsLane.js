import React from 'react';
import PropTypes from 'prop-types';
import { combineCssClasses } from '../../helpers/styleHelper';
import EventsLaneItem from './EventsLaneItem';

const EventsLane = ({
	events,
	className,
	width,
}) => (
	<div
		className={combineCssClasses({
			'events-lane': true,
			[className]: className,
		})}
		style={{ width }}
	>
		{events.map((event) => <EventsLaneItem key={event.id} {...event} />)}
	</div>
);

EventsLane.defaultProps = {
	events: [],
	className: '',
	width: 0,
};

EventsLane.propTypes = {
	events: PropTypes.arrayOf(PropTypes.shape(EventsLaneItem.propTypes)),
	className: PropTypes.string,
	width: PropTypes.number,
};

export default EventsLane;
