import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';

const SelectionMarker = ({ dots }) => (
	<div className="timeDots">
		{dots.map(({
			key,
			position: left,
			color,
			tooltipContent,
		}) => (
			<span
				key={key}
				className="timeDots_dot"
				style={{ left, color }}
			>
				<Tooltip content={tooltipContent} color={color} show />
			</span>
		))}
	</div>
);

SelectionMarker.propTypes = {
	dots: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		position: PropTypes.number.isRequired,
		color: PropTypes.string.isRequired,
		tooltipContent: PropTypes.string.isRequired,
	})).isRequired,
};

export default SelectionMarker;
