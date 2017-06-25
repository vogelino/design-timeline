import React from 'react';
import PropTypes from 'prop-types';

const SelectionMarker = ({ date, color: backgroundColor, scaleFunc }) => (
	<div
		className="selectionMarker"
		style={{
			left: scaleFunc(date) + 100,
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
