import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ iconId }) => (
	<i className={`icon icon--${iconId}`} />
);

Icon.propTypes = {
	iconId: PropTypes.oneOf([
		'event',
		'text',
		'video',
		'image',
		'social',
		'quote',
		'audio',
		'tweet',
	]),
};

export default Icon;
