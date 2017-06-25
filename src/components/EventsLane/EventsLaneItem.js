import React from 'react';
import PropTypes from 'prop-types';
import { combineCssClasses } from '../../helpers/styleHelper';
import Tooltip from '../Tooltip';

const EventsLaneItem = ({
	id,
	data: { title, startDate, type, future },
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
			[`events-lane_item--${future}`]: future,
		})}
		id={id}
		style={{ left: scaleFunc(startDate) + 100, color }}
		title={title}
		{...rest}
	>
		<span
			className={combineCssClasses({
				'events-lane_itemsymbol': true,
				'events-lane_itemsymbol--hovered': hovered,
				'events-lane_itemsymbol--selected': selected,
				[`events-lane_itemsymbol--${future}`]: future,
			})}
		/>
		<Tooltip
			content={title}
			iconId={type}
			show={hovered}
			color={color}
		/>
	</button>
);

EventsLaneItem.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		startDate: PropTypes.instanceOf(Date).isRequired,
		future: PropTypes.oneOf(['trend', 'extreme']),
	}).isRequired,
	state: PropTypes.shape({
		selected: PropTypes.bool.isRequired,
		hovered: PropTypes.bool.isRequired,
	}).isRequired,
	scaleFunc: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired,
};

export default EventsLaneItem;
