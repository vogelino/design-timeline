import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../redux/actions/eventsActions';

const EventsListItem = ({
	id,
	title,
	selected,
	onClick,
}) => (
	<button
		className="events-list-item"
		id={`events-list-item-${id}`}
		onClick={() => onClick(id)}
		style={{ color: selected ? 'blue' : 'red' }}
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
	onClick: PropTypes.func.isRequired,
};

const EventsList = ({ events, actions }) => (
	<div className="events-list">
		{events.map((event) => (
			<EventsListItem
				{...event}
				key={event.id}
				onClick={actions.selectEvent}
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
