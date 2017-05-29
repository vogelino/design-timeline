import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { combineCssClasses } from '../../helpers/styleHelper';
import './Sidebar.css';

const SidebarContent = ({
	id,
	data: {
		title,
		text,
		startDate,
	},
}) => (
	<div className="siderbar_content" id={`sidebar_content-${id}`}>
		<h1>{title}</h1>
		<h2>{text}</h2>
		<h2>{startDate.toString()}</h2>
	</div>
);

SidebarContent.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	}).isRequired,
};

const SelectMessage = () => (
	<div className="sidebar_selectMessage">
		Please select an item to view its content
	</div>
);

const Sidebar = ({ selectedEvent }) => (
	<div className="sidebar">
		{!selectedEvent ?
			<SelectMessage /> : <SidebarContent {...selectedEvent} />}
	</div>
);

Sidebar.defaultProps = {
	selectedEvent: null,
};

Sidebar.propTypes = {
	selectedEvent: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			data: PropTypes.shape({
				title: PropTypes.string.isRequired,
				text: PropTypes.string.isRequired,
			}).isRequired,
		}),
	]),
};

const mapStateToProps = ({ events }) => ({
	selectedEvent: events.find(({ state }) => state.selected),
});

export default connect(mapStateToProps)(Sidebar);