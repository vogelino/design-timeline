import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scaleTime } from 'd3-scale';
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
	const eventsByDate = events.sort((evt1, evt2) =>
		evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
	);
	const scaleFunc = scaleTime().domain([
		eventsByDate[0].data.startDate,
		eventsByDate[events.length - 1].data.startDate,
	]).range([0, 4000]);

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
						scaleFunc={scaleFunc}
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
