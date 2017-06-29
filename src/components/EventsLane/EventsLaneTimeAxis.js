import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'react-throttle-props';
import { getTimeLabels } from '../../helpers/timelineHelper';

class EventsLaneTimeAxis extends Component {
	shouldComponentUpdate(nextProps) {
		const { totalWidth, offset, visibleWidth } = this.props;
		return totalWidth !== nextProps.totalWidth ||
			offset !== nextProps.offset ||
			visibleWidth !== nextProps.visibleWidth;
	}
	render() {
		const { scaleFunc, totalWidth, offset, visibleWidth } = this.props;
		const timeLabels = getTimeLabels({
			totalWidth,
			visibleWidth,
			scaleFunc,
			offset,
		});
		return (
			<div className="events-lane_dateaxis">
				{timeLabels.map(({ text, position, moment }) => (
					<span
						key={moment.toISOString()}
						className="events-lane_datelabel"
						style={{ left: position }}
					>
						{text}
					</span>
				))}
			</div>
		);
	}
}

EventsLaneTimeAxis.defaultProps = {
	totalWidth: 1000,
	visibleWidth: 1000,
	scaleFunc: (x) => x,
	offset: 0,
};

EventsLaneTimeAxis.propTypes = {
	totalWidth: PropTypes.number,
	visibleWidth: PropTypes.number,
	scaleFunc: PropTypes.func,
	offset: PropTypes.number,
};

export default throttle(EventsLaneTimeAxis, 100);
