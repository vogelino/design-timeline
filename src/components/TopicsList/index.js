import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TopicsList.css';

export const TopicsListComponent = ({ categories }) => (
	<ul className="topicsList">
		{categories.map(({ title, slug, color }) => (
			<li
				key={slug}
				className="topicsList_item"
				style={{ color }}
			>
				<span>{title}</span>
			</li>
		))}
	</ul>
);

TopicsListComponent.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
	})).isRequired,
};

const mapStateToProps = ({ categories }) => ({ categories });
export default connect(mapStateToProps)(TopicsListComponent);
