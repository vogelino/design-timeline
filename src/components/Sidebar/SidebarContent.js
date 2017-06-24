import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/de';
import SidebarLinksList from './SidebarLinksList';
import SidebarCategory from './SidebarCategory';
import SidebarImage from './SidebarImage';

const SidebarContent = ({
	id,
	data: {
		title,
		text,
		startDate,
		externalLinks,
		category,
		type,
		titleImage,
		mediaCredits,
	},
}) => (
	<div className="sidebar_content" id={`sidebar_content-${id}`}>
		<SidebarCategory category={category} type={type} />
		{titleImage ? <SidebarImage url={titleImage} credits={mediaCredits} /> : null}
		<h1 className="sidebar_title">{title}</h1>
		<h2 className="sidebar_date">{moment(startDate).format('LL')}</h2>
		<p className="sidebar_description">{text}</p>
		{externalLinks.length ? <SidebarLinksList {...{ externalLinks }} /> : null}
	</div>
);

SidebarContent.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		startDate: PropTypes.instanceOf(Date).required,
		externalLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
		category: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		titleImage: PropTypes.string,
		mediaCredits: PropTypes.string,
	}).isRequired,
};

export default SidebarContent;
