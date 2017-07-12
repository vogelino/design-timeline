import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './IntroBubbles.css';

const getRandomInt = (min, max) =>
	Math.floor(Math.random() * ((max - min) + 1)) + min;

class IntroBubbles extends Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		const { colors } = this.props;
		const bubbles = Array.from(Array(20)).map((val, id) => {
			const diameter = getRandomInt(100, 2);
			return {
				id,
				diameter,
				color: colors[getRandomInt(colors.length, 0)],
				xPosition: getRandomInt(100, 0),
				yPosition: getRandomInt(100, 0),
			};
		});
		return (
			<div className="introbubbles">
				{bubbles.map((bubble) => (
					<div
						key={bubble.id}
						className="introbubbles_bubblewrapper"
						style={{
							width: bubble.diameter,
							height: bubble.diameter,
							left: `${bubble.xPosition}%`,
							top: `${bubble.yPosition}%`,
						}}
					>
						<span
							className="introbubbles_bubble"
							style={{
								width: bubble.diameter,
								height: bubble.diameter,
								borderColor: bubble.color,
							}}
						/>
					</div>
				))}
			</div>
		);
	}
}

IntroBubbles.defaultProps = {
	colors: [],
};

IntroBubbles.propTypes = {
	colors: PropTypes.array,
};

const mapStateToProps = ({ categories }) => ({
	colors: categories.map(({ color }) => color),
});
export default connect(mapStateToProps)(IntroBubbles);
