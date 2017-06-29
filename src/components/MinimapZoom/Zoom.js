import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const getWidth = (percentage) => ({
	width: `${percentage}%`,
});
const Zoom = ({
	visiblePercentage,
	startPercentage,
	endPercentage,
}) => (
	<div className="zoom">
		<div
			className="zoom_startoffset"
			style={getWidth(startPercentage)}
		/>
		<div
			className="zoom_endoffset"
			style={getWidth(endPercentage)}
		/>
		<div
			className="zoom_visiblepart"
			style={{
				...getWidth(visiblePercentage),
				left: `${startPercentage}%`,
			}}
		/>
		<div
			className="zoom_startHandler zoom_handler"
			style={{ left: `${startPercentage}%` }}
		>
			<div className="zoom_handlerwrapper">
				<span className="zoom_handlerbar" />
				<span className="zoom_handlergrabber" />
				<span className="zoom_handlerdate" />
			</div>
		</div>
		<div
			className="zoom_endHandler zoom_handler"
			style={{ right: `${endPercentage}%` }}
		>
			<div className="zoom_handlerwrapper">
				<span className="zoom_handlerbar" />
				<span className="zoom_handlergrabber" />
				<span className="zoom_handlerdate" />
			</div>
		</div>
	</div>
);

Zoom.defaultProps = {
	visiblePercentage: 100,
	startPercentage: 0,
	endPercentage: 0,
};

Zoom.propTypes = {
	visiblePercentage: PropTypes.number,
	startPercentage: PropTypes.number,
	endPercentage: PropTypes.number,
};

const HUNDRED_PERCENT = 100;
const mapStateToProps = ({
	zoom: { start, end },
}) => ({
	visiblePercentage: end - start,
	startPercentage: start,
	endPercentage: HUNDRED_PERCENT - end,
});

export default connect(mapStateToProps)(Zoom);
