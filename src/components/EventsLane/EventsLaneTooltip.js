import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { combineCssClasses } from '../../helpers/styleHelper';

const EventsLaneTooltip = ({ content, iconId, color: backgroundColor, show }) => (
	<span
		className={combineCssClasses({
			'events-lane_item_tooltip': true,
			'events-lane_item_tooltip--visible': show,
		})}
		style={{ backgroundColor }}
	>
		{content}
		<span className="events-lane_item_tooltipicon">
			<Icon iconId={iconId} />
		</span>
		<span
			className="events-lane_item_tooltiparrow"
			style={{ backgroundColor }}
		/>
	</span>
);

EventsLaneTooltip.defaultProps = {
	show: false,
};

EventsLaneTooltip.propTypes = {
	content: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	show: PropTypes.bool,
	iconId: PropTypes.oneOf([
		'audio',
		'event',
		'image',
		'person',
		'quote',
		'social',
		'terminology',
		'text',
		'video',
		'web',
	]).isRequired,
};

export default EventsLaneTooltip;
