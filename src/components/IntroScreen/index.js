import React from 'react';
// import PropTypes from 'prop-types';
import './IntroScreen.css';
import { connect } from 'react-redux';


const IntroScreen = (props) => (
	<div className={props.visible ?  "introscreen introscreen--visible" : "introscreen introscreen--hidden"}>
	</div>
);

const mapStateToProps = (state) => ({
	visible: state.introScreen.visible,
});

export default connect(mapStateToProps)(
	IntroScreen
);
