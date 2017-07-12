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
		const { colors, windowWidth, windowHeight } = this.props;
		const bubbles = Array.from(Array(20)).map((val, id) => {
			const diameter = getRandomInt(100, 2);
			return {
				id,
				diameter,
				color: colors[getRandomInt(colors.length, 0)],
				xPosition: getRandomInt((windowWidth + (diameter / 2)), 0),
				yPosition: getRandomInt((windowHeight + (diameter / 2)), 0),
			};
		});
		return (
			<div className="introbubbles">
				{bubbles.map((bubble) => (
					<div
						key={bubble.id}
						className="introbubbles_bubble"
						style={{
							width: bubble.diameter,
							height: bubble.diameter,
							borderColor: bubble.color,
							left: bubble.xPosition,
							top: bubble.yPosition,
						}}
					/>
				))}
			</div>
		);
	}
}

IntroBubbles.defaultProps = {
	colors: [],
	windowHeight: 800,
	windowWidth: 1200,
};

IntroBubbles.propTypes = {
	colors: PropTypes.array,
	windowHeight: PropTypes.number,
	windowWidth: PropTypes.number,
};

const mapStateToProps = ({ categories, ui: { windowWidth, windowHeight } }) => ({
	colors: categories.map(({ color }) => color),
	windowWidth,
	windowHeight,
});
export default connect(mapStateToProps)(IntroBubbles);
