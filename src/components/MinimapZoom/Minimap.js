import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createScaleFunction, getLanes } from '../../helpers/timelineHelper';
import { SIDEBAR_WIDTH, MINIMAP_MARGIN } from '../../redux/constants/uiConstants';
import './MinimapZoom.css';

export const MinimapComponent = ({
	events,
	categories,
	ui: { windowWidth },
	mainTimeline: { minDate, maxDate },
}) => {
	const totalWidth = windowWidth - SIDEBAR_WIDTH - (2 * MINIMAP_MARGIN);
	const scaleFunc = createScaleFunction({ totalWidth, minDate, maxDate });
	const lanes = getLanes({ categories, events, scaleFunc });
	return (
		<div className="minimapZoom" />
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
