import React from 'react';
import PropTypes from 'prop-types';

const SidebarLinksList = ({ externalLinks }) => (
	<ul className="sidebar_externallinks">
		{externalLinks.map((url, index) => (
			<li key={url} className="sidebar_externallink">
				<a
					href={url}
					title={`Link ${index + 1}`}
					target="_blank"
					rel="noreferrer noopener"
				>
					{`Link ${index + 1}`}
				</a>
			</li>
		))}
	</ul>
);

SidebarLinksList.propTypes = {
	externalLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SidebarLinksList;
