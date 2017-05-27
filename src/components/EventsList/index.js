import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { combineCssClasses } from '../../helpers/styleHelper';
import * as eventsActions from '../../redux/actions/eventsActions';

const EventsListItem = ({
	id,
	data: { title },
	state: { selected, hovered },
	...rest
}) => (
	<button
		className={combineCssClasses({
			'events-list-item': true,
			hovered,
			selected,
		})}
		id={`events-list-item-${id}`}
		{...rest}
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
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
	}).isRequired,
	state: PropTypes.shape({
		selected: PropTypes.bool.isRequired,
		hovered: PropTypes.bool.isRequired,
	}).isRequired,
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
};

const mapStateToProps = ({ events }) => ({ events });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(eventsActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
