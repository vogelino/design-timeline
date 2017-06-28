import React from 'react';
import PropTypes from 'prop-types';
import { combineCssClasses } from '../../helpers/styleHelper';
import EventsLaneItem from './EventsLaneItem';

const EventsLane = ({
	events,
	className,
	classNamePrefix,
	width,
}) => (
	<div
		className={combineCssClasses({
			'events-lane': true,
			[`${classNamePrefix}_events-lane`]: className,
			[className]: className,
		})}
		style={{ width }}
	>
		{events.map((event) => (
			<EventsLaneItem
				{...event}
				key={event.id}
				classNamePrefix={classNamePrefix}
			/>
		))}
	</div>
);

EventsLane.defaultProps = {
	events: [],
	className: '',
	classNamePrefix: '',
	width: 0,
};

EventsLane.propTypes = {
	events: PropTypes.arrayOf(PropTypes.shape(EventsLaneItem.propTypes)),
	className: PropTypes.string,
	classNamePrefix: PropTypes.string,
	width: PropTypes.number,
};

export default EventsLane;
