import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';

class TimesDots extends Component {
	constructor(props) {
		super(props);
		this.state = { hoveredDot: false };
	}
	onMouseEnter(key) {
		this.setState({ hoveredDot: key });
	}
	onMouseLeave() {
		this.setState({ hoveredDot: false });
	}
	render() {
		const { dots } = this.props;
		return (
			<div className="timeDots">
				<div className="timeDots_wrapper">
					{dots.map(({
						key,
						position: left,
						color,
						tooltipContent,
						show,
						offset,
					}) => (
						<span
							key={key}
							className="timeDots_dot"
							style={{
								left,
								color,
								transform: `translateX(-${offset + 4}px)`,
							}}
							onMouseEnter={() => this.onMouseEnter(key)}
							onMouseLeave={() => this.onMouseLeave()}
						>
							<Tooltip
								content={tooltipContent}
								color={color}
								show={show || this.state.hoveredDot === key}
							/>
						</span>
					))}
				</div>
			</div>
		);
	}
}

TimesDots.propTypes = {
	dots: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		position: PropTypes.number.isRequired,
		offset: PropTypes.number.isRequired,
		color: PropTypes.string.isRequired,
		tooltipContent: PropTypes.string.isRequired,
		show: PropTypes.bool,
	})).isRequired,
};

export default TimesDots;
