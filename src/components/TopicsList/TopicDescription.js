import React from 'react';
import PropTypes from 'prop-types';
import { combineCssClasses } from '../../helpers/styleHelper';

const TopicDescription = ({
	title,
	description,
	color: backgroundColor,
	show,
}) => (
	<section
		className={combineCssClasses({
			topicsList_itemdescription: true,
			'topicsList_itemdescription--visible': show,
		})}
		style={{ backgroundColor }}
	>
		<h4 className="topicsList_itemdescriptiontitle">{title}</h4>
		<p className="topicsList_itemdescriptioncontent">{description}</p>
	</section>
);

TopicDescription.defaultProps = {
	show: false,
};

TopicDescription.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	show: PropTypes.bool,
};

export default TopicDescription;
