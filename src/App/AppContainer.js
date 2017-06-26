import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import throttle from 'throttle-debounce/throttle';
import * as uiActions from '../redux/actions/uiActions';

export class AppContainerComponent extends Component {
	constructor(props) {
		super(props);

		this.updateDimensions = throttle(100, this.updateDimensions.bind(this));
	}
	componentWillMount() {
		this.updateDimensions();
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
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
			<div className="appContainer">
				{this.props.children}
			</div>
		);
	}
}

AppContainerComponent.defaultProps = {
	actions: {
		setUiDimensions: () => {},
	},
	children: null,
};

AppContainerComponent.propTypes = {
	actions: PropTypes.shape({
		setUiDimensions: PropTypes.func,
	}),
	children: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(uiActions, dispatch),
});
export default connect(null, mapDispatchToProps)(AppContainerComponent);
