import React from 'react';
import PropTypes from 'prop-types';
import ReactScrollbar from 'react-scrollbar';
import './ScrollArea.css';

const ScrollArea = (props) => (
	<ReactScrollbar {...props}>
		{props.children}
	</ReactScrollbar>
);

ScrollArea.propTypes = {
	children: PropTypes.any.isRequired,
};

export default ScrollArea;
