import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../redux/actions/eventsActions';

const EventsListItem = ({
	id,
	title,
	selected,
	hovered,
	onClick,
	onMouseEnter,
	onMouseLeave,
}) => (
	<button
		className="events-list-item"
		id={`events-list-item-${id}`}
		onClick={onClick}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		/* eslint-disable no-nested-ternary */
		style={{ color: selected ? 'blue' : (
			hovered ? 'green' : 'red'
		) }}
		/* eslint-enable no-nested-ternary */
	>
		<h4>
			{title}
		</h4>
	</button>
);

EventsListItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	hovered: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	onMouseEnter: PropTypes.func.isRequired,
	onMouseLeave: PropTypes.func.isRequired,
};

const EventsList = ({ events, actions }) => (
	<div className="events-list">
		{events.map((event) => (
			<EventsListItem
				{...event}
				key={event.id}
				onClick={() => actions.selectEvent(event.id)}
				onMouseEnter={() => actions.setHoveredStatus(event.id, true)}
				onMouseLeave={() => actions.setHoveredStatus(event.id, false)}
			/>
		))}
	</div>
);

EventsList.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			selected: PropTypes.bool.isRequired,
		}),
	).isRequired,
	actions: PropTypes.shape({
		selectEvent: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = ({ events }) => ({ events });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(eventsActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
