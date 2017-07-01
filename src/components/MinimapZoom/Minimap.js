import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createScaleFunction, getLanes } from '../../helpers/timelineHelper';
import { SIDEBAR_WIDTH, MINIMAP_MARGIN } from '../../redux/constants/uiConstants';
import EventsLane from '../EventsLane/EventsLane';

export const MinimapComponent = ({
	events,
	categories,
	ui: { windowWidth },
	mainTimeline: { minDate, maxDate },
}) => {
	const totalWidth = windowWidth - SIDEBAR_WIDTH - (2 * MINIMAP_MARGIN);
	const scaleFunc = createScaleFunction({ totalWidth, minDate, maxDate });
	const lanes = getLanes({ categories, events, scaleFunc });
	const getFutureZone = (date, classPrefix) => (
		<div
			className={`events-lanes_${classPrefix}`}
			style={{
				width: windowWidth - SIDEBAR_WIDTH - scaleFunc(date) - MINIMAP_MARGIN,
			}}
		/>
	);
	return (
		<div className="minimap">
			{getFutureZone(new Date('2017-07-02'), 'publication')}
			{getFutureZone(new Date(), 'future')}
			{lanes.map(({ laneSlug, laneEvents }) => (
				<EventsLane
					key={laneSlug}
					classNamePrefix="minimap"
					className={laneSlug}
					events={laneEvents}
					width={totalWidth}
				/>
			))}
		</div>
	);
};


MinimapComponent.propTypes = {
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
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			color: PropTypes.string.isRequired,
		}),
	).isRequired,
	ui: PropTypes.shape({
		windowWidth: PropTypes.number.isRequired,
	}),
	mainTimeline: PropTypes.shape({
		minDate: PropTypes.instanceOf(Date).isRequired,
		maxDate: PropTypes.instanceOf(Date).isRequired,
	}),
};

const mapStateToProps = ({ events, categories, ui, mainTimeline }) =>
	({ events, categories, ui, mainTimeline });
export default connect(mapStateToProps)(MinimapComponent);
