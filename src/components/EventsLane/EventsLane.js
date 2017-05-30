import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { combineCssClasses } from '../../helpers/styleHelper';
import * as eventsActions from '../../redux/actions/eventsActions';
import EventsLaneItem from './EventsLaneItem';

export const EventsLaneComponent = ({
	events,
	actions,
	className,
	scaleFunc,
	color,
	width,
}) => (
	<div
		className={combineCssClasses({
			'events-lane': true,
			[className]: className,
		})}
		style={{ width }}
	>
		{events.map((event) => (
			<EventsLaneItem
				{...event}
				key={event.id}
				onClick={() => actions.selectEvent(event.id)}
				onMouseEnter={() => actions.setHoveredStatus(event.id, true)}
				onMouseLeave={() => actions.setHoveredStatus(event.id, false)}
				scaleFunc={scaleFunc}
				color={color}
			/>
		))}
	</div>
);

EventsLaneComponent.defaultProps = {
	className: '',
};

EventsLaneComponent.propTypes = {
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
	actions: PropTypes.shape({
		selectEvent: PropTypes.func.isRequired,
	}).isRequired,
	className: PropTypes.string,
	scaleFunc: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(eventsActions, dispatch),
});
export default connect(null, mapDispatchToProps)(EventsLaneComponent);
