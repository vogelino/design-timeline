import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Sidebar.css';
import SelectMessage from './SelectMessage';
import SidebarContent from './SidebarContent';

export const SidebarComponent = ({ selectedEvent }) => (
	<div className="sidebar">
		{!selectedEvent ?
			<SelectMessage /> : <SidebarContent {...selectedEvent} />}
	</div>
);

SidebarComponent.defaultProps = {
	selectedEvent: null,
};

SidebarComponent.propTypes = {
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

export default connect(mapStateToProps)(SidebarComponent);
