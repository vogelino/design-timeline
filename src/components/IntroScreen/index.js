import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactMarkdown from 'react-markdown';
import ScrollArea from '../ScrollArea';
import { combineCssClasses } from '../../helpers/styleHelper';
import * as introScreenActions from '../../redux/actions/introScreenActions';
import IntroBubbles from './IntroBubbles';
import './IntroScreen.css';

export const IntroScreenComponent = ({
	visible,
	text,
	title,
	buttonText,
	hideIntroScreen,
}) => (
	<div
		className={combineCssClasses({
			introscreen: true,
			'introscreen--visible': visible,
			'introscreen--hidden': !visible,
		})}
	>
		<div className="introscreen_content">
			<div className="introscreen_start-title">{title}</div>
			<ScrollArea className="introscreen_start-text">
				<ReactMarkdown source={text} />
			</ScrollArea>
			<button
				className="introscreen_start-button"
				onClick={hideIntroScreen}
			>
				{buttonText}
			</button>
		</div>
		<div className="introscreen_ocean">
			<div className="introscreen_wave" />
		</div>
		<IntroBubbles />
	</div>
);

IntroScreenComponent.defaultProps = {
	visible: true,
	title: '',
	text: '',
	buttonText: '',
	hideIntroScreen: (x) => x,
};

IntroScreenComponent.propTypes = {
	visible: PropTypes.bool,
	title: PropTypes.string,
	text: PropTypes.string,
	buttonText: PropTypes.string,
	hideIntroScreen: PropTypes.func,
};

const mapStateToProps = ({ introScreen }) => ({ ...introScreen });
const mapDispatchToProps = (dispatch) => bindActionCreators(introScreenActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(IntroScreenComponent);
