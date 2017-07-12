import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { combineCssClasses } from '../../helpers/styleHelper';
import './IntroScreen.css';

export const IntroScreenComponent = ({ visible, text, title, buttonText }) => (
	<div
		className={combineCssClasses({
			introscreen: true,
			'introscreen--visible': visible,
			'introscreen--hidden': !visible,
		})}
	>
		<div className="introscreen_content">
			<div className="introscreen_start-title">{title}</div>
			<ReactMarkdown
				className="introscreen_start-text"
				source={text}
			/>
			<button className="introscreen_start-button">{buttonText}</button>
		</div>
		<div className="introscreen_ocean">
			<div className="introscreen_wave" />
		</div>
	</div>
);

IntroScreenComponent.defaultProps = {
	visible: true,
	title: '',
	text: '',
	buttonText: '',
};

IntroScreenComponent.propTypes = {
	visible: PropTypes.bool,
	title: PropTypes.string,
	text: PropTypes.string,
	buttonText: PropTypes.string,
};

const mapStateToProps = ({ introScreen }) => ({ ...introScreen });
export default connect(mapStateToProps)(IntroScreenComponent);
