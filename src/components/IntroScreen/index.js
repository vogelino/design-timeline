import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { combineCssClasses } from '../../helpers/styleHelper';
import './IntroScreen.css';

export const IntroScreenComponent = ({ visible }) => (
	<div
		className={combineCssClasses({
			introscreen: true,
			'introscreen--visible': visible,
			'introscreen--hidden': !visible,
		})}
	/>
);

IntroScreenComponent.propTypes = {
	visible: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	visible: state.introScreen.visible,
});

export default connect(mapStateToProps)(IntroScreenComponent);
