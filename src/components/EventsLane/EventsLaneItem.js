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
	/>
);

EventsLaneItem.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
	}).isRequired,
	state: PropTypes.shape({
		selected: PropTypes.bool.isRequired,
		hovered: PropTypes.bool.isRequired,
	}).isRequired,
	scaleFunc: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired,
};

export default EventsLaneItem;
