import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import throttle from 'throttle-debounce/throttle';
import * as uiActions from '../redux/actions/uiActions';
import { showIntroScreen } from '../redux/actions/introScreenActions';

const TIMER_IN_MS = (60 * 1000) * 3;


export class AppContainerComponent extends Component {
	constructor(props) {
		super(props);

		this.updateDimensions = throttle(100, this.updateDimensions.bind(this));
		this.createTimer = this.createTimer.bind(this);
	}
	componentWillMount() {
		this.updateDimensions();
	}
	componentDidMount() {
		this.createTimer();
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	createTimer() {
		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(this.props.actions.showIntroScreen, TIMER_IN_MS);
	}
	updateDimensions() {
		this.props.actions.setUiDimensions({
			width: Math.round(
				document.documentElement.clientWidth, window.innerWidth || 0
			),
			height: Math.round(
				document.documentElement.clientHeight, window.innerHeight || 0
			),
		});
	}
	render() {
		return (
			<div
				className="appContainer"
				onMouseMove={throttle(1000, this.createTimer)}
			>
				{this.props.children}
			</div>
		);
	}
}

AppContainerComponent.defaultProps = {
	actions: {
		setUiDimensions: () => {},
		showIntroScreen: () => {},
	},
	children: null,
};

AppContainerComponent.propTypes = {
	actions: PropTypes.shape({
		setUiDimensions: PropTypes.func,
		showIntroScreen: PropTypes.func,
	}),
	children: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...uiActions, showIntroScreen }, dispatch),
});
export default connect(null, mapDispatchToProps)(AppContainerComponent);
