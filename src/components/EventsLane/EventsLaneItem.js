import React from 'react';
import PropTypes from 'prop-types';
import { combineCssClasses } from '../../helpers/styleHelper';

const EventsLaneItem = ({
	id,
	data: { title, startDate },
	state: { selected, hovered },
	scaleFunc,
	color,
	...rest
}) => (
	<button
		className={combineCssClasses({
			'events-lane_item': true,
			'events-lane_item--hovered': hovered,
			'events-lane_item--selected': selected,
		})}
		id={id}
		style={{
			left: scaleFunc(startDate) + 200,
			color,
		}}
		title={title}
		{...rest}
	>
		<span
			className={combineCssClasses({
				'events-lane_item_tooltip': true,
				'events-lane_item_tooltip--visible': hovered || selected,
			})}
			style={{ backgroundColor: color }}
		>
			{title}
		</span>
	</button>
);

EventsLaneItem.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		startDate: PropTypes.instanceOf(Date).isRequired,
	}).isRequired,
	state: PropTypes.shape({
		selected: PropTypes.bool.isRequired,
		hovered: PropTypes.bool.isRequired,
	}).isRequired,
	scaleFunc: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired,
};

export default EventsLaneItem;
