import React from 'react';
import PropTypes from 'prop-types';
import audio from './icons/audio.svg';
import event from './icons/event.svg';
import image from './icons/image.svg';
import person from './icons/person.svg';
import quote from './icons/quote.svg';
import social from './icons/social.svg';
import terminology from './icons/terminology.svg';
import text from './icons/text.svg';
import video from './icons/video.svg';
import web from './icons/web.svg';
import './Icon.css';

const icons = {
	audio,
	event,
	image,
	person,
	quote,
	social,
	terminology,
	text,
	video,
	web,
};

const Icon = ({ iconId }) => (
	<img
		src={icons[iconId]}
		alt={`${iconId} icon`}
		className={`icon icon--${iconId}`}
	/>
);

Icon.propTypes = {
	iconId: PropTypes.oneOf([
		'audio',
		'event',
		'image',
		'person',
		'quote',
		'social',
		'terminology',
		'text',
		'video',
		'web',
	]),
};

export default Icon;
