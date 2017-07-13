import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Mayre from 'mayre';
import ReactPlayer from 'react-player';
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
		video,
	},
}) => (
	<div className="sidebar_content" id={`sidebar_content-${id}`}>
		<SidebarCategory category={category} type={type} />
		<Mayre
			of={<SidebarImage url={titleImage || ''} credits={mediaCredits || ''} />}
			when={type !== 'video' && Boolean(titleImage)}
		/>
		<Mayre
			of={<ReactPlayer {...{ url: video || '', width: 280, height: 160 }} />}
			when={type === 'video' && Boolean(video)}
		/>
		<h1 className="sidebar_title">{title}</h1>
		<h2 className="sidebar_date">{moment(startDate).format('LL')}</h2>
		<p className="sidebar_description">{text}</p>
		<Mayre
			of={<SidebarLinksList {...{ externalLinks }} />}
			when={Boolean(externalLinks.length)}
		/>
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
		video: PropTypes.string,
	}).isRequired,
};

export default SidebarContent;
