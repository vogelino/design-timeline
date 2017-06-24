import React from 'react';
import PropTypes from 'prop-types';

const SidebarImage = ({ url, credits }) => (
	<figure
		className="sidebar_image"
		style={{ backgroundImage: `url(${url})` }}
	>
		{credits ?
			<figcaption className="sidebar_credits">{credits}</figcaption> : null}
	</figure>
);

SidebarImage.propTypes = {
	url: PropTypes.string.isRequired,
	credits: PropTypes.string,
};

export default SidebarImage;
