import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { combineCssClasses } from '../../helpers/styleHelper';
import * as eventsActions from '../../redux/actions/eventsActions';
import EventsLaneItem from './EventsLaneItem';

const EventsLane = ({
	events,
	actions,
	className,
	scaleFunc,
	color,
}) => (
	<div
		className={combineCssClasses({
			'events-lane': true,
			[className]: className,
		})}
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

EventsLane.defaultProps = {
	className: '',
};

EventsLane.propTypes = {
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
};

const mapStateToProps = (state, { events, scaleFunc }) => ({
	events,
	scaleFunc,
});
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(eventsActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventsLane);
