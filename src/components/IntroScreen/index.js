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
	>
		<div className="introscreen content">
			<div className="introscreen content start-title">
				Getting a Designjob in 2030
			</div>
			<div className="introscreen content start-text">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
				sed diam nonumy eirmod tempor invidunt ut labore et dolore
				magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren,
				no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
				ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
				nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
				erat, sed diam voluptua. At vero eos et accusam et justo duo
				dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
				sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea
				rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
				hendrerit in vulputate velit esse molestie
				consequat, vel illum dolore eu feugiat nulla facilisis at vero
				eros et accumsan et iusto odio dignissim qui blandit praesent
				luptatum zzril delenit augue duis dolore te feugait nulla
				facilisi. Lorem ipsum dolor sit amet.
			</div>
			<button className="introscreen content start-button">
				explore
			</button>

			<div id="dots">
				<div className="dot n1" />
				<div className="dot n2" />
				<div className="dot n3" />
				<div className="dot n4" />
				<div className="dot n5" />
			</div>
			<div className="ocean">
				<div className="wave" />
				<div className="wave" />
			</div>
		</div>
	</div>
);

IntroScreenComponent.propTypes = {
	visible: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	visible: state.introScreen.visible,
});

export default connect(mapStateToProps)(IntroScreenComponent);
