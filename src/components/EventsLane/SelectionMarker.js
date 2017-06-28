import React from 'react';
import PropTypes from 'prop-types';
import { TIMELINE_MARGIN } from '../../redux/constants/uiConstants';

const SelectionMarker = ({ date, color: backgroundColor, scaleFunc }) => (
	<div
		className="selectionMarker"
		style={{
			left: scaleFunc(date) + TIMELINE_MARGIN,
			backgroundColor,
		}}
	/>
);

SelectionMarker.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	color: PropTypes.string.isRequired,
	scaleFunc: PropTypes.func.isRequired,
};

export default SelectionMarker;
