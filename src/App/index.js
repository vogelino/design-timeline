import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import EventsList from '../components/EventsList';
import Sidebar from '../components/Sidebar';

const categories = [
	'design-thinking',
	'big-data',
	'data-literacy',
	'design-attitude',
	'new-work',
	'filter-bubble',
	'privacy-monitoring-tracking',
	'critical-speculative-fiction-design',
	'artificial-intelligence-deep-learning-machine-learning',
	'portfolio-businessmodel-job-offers',
	'interface-interaction-service-social-sustainable-business-strategy-design',
];

const App = ({ events }) => {
	const lanes = categories.map((category) => ({
		laneSlug: category,
		laneEvents: events.filter(({ data: { category: eventCategory } }) =>
			category === eventCategory),
	}));
	return (
		<div className="appContainer">
			<Sidebar />
			<ul className="events-lanes">
				{lanes.map(({ laneSlug, laneEvents }) => (
					<EventsList
						key={laneSlug}
						className={laneSlug}
						events={laneEvents}
					/>
				))}
			</ul>
		</div>
	);
};

App.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({ id: PropTypes.string.isRequired }),
	).isRequired,
};

const mapStateToProps = (({ events }) => ({ events }));

export default connect(mapStateToProps)(App);
