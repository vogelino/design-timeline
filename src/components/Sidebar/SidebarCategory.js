import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '../Icon';

export const SidebarCategoryComponent = ({
	category: { color: backgroundColor, title },
	type,
}) => (
	<header
		className="sidebar_category"
		style={{ backgroundColor }}
	>
		{title}
		<span className="sidebar_categoryicon">
			<Icon iconId={type} />
		</span>
	</header>
);

SidebarCategoryComponent.propTypes = {
	category: PropTypes.shape({
		title: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
	}).isRequired,
	type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ categories }, { category, type }) => ({
	category: categories.find(({ slug }) => slug === category),
	type,
});

export default connect(mapStateToProps)(SidebarCategoryComponent);
