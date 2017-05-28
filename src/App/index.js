import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scaleTime } from 'd3-scale';
import './App.css';
import EventsList from '../components/EventsList';
import Sidebar from '../components/Sidebar';

const App = ({ events, categories }) => {
	const eventsByDate = events.sort((evt1, evt2) =>
		evt1.data.startDate.valueOf() - evt2.data.startDate.valueOf()
	);
	const scaleFunc = scaleTime().domain([
		eventsByDate[0].data.startDate,
		eventsByDate[events.length - 1].data.startDate,
	]).range([0, 4000]);

	const lanes = categories.map((category) => ({
		laneTitle: category.title,
		laneSlug: category.slug,
		laneColor: category.color,
		laneEvents: events.filter(({ data: { category: eventCategory } }) =>
			category.slug === eventCategory),
	}));
	return (
		<div className="appContainer">
			<Sidebar />
			<ul className="events-lanes">
				{lanes.map(({ laneSlug, laneColor, laneEvents }) => (
					<EventsList
						key={laneSlug}
						className={laneSlug}
						events={laneEvents}
						scaleFunc={scaleFunc}
						color={laneColor}
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
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			slug: PropTypes.string.isRequired,
			color: PropTypes.string.isRequired,
		}),
	).isRequired,
};

const mapStateToProps = (({ events, categories }) => ({ events, categories }));

export default connect(mapStateToProps)(App);
