import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/de';
import SidebarLinksList from './SidebarLinksList';
import SidebarCategory from './SidebarCategory';

const SidebarContent = ({
	id,
	data: { title, text, startDate, externalLinks, category, type },
}) => (
	<div className="sidebar_content" id={`sidebar_content-${id}`}>
		<SidebarCategory category={category} type={type} />
		<h1 className="sidebar_title">{title}</h1>
		<h2 className="sidebar_date">{moment(startDate).calendar()}</h2>
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
	}).isRequired,
};

export default SidebarContent;
