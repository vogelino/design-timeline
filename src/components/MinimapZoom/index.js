import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as zoomActions from '../../redux/actions/zoomActions';

export const MinimapZoomComponent = () => (
	<div className="minimapZoom">
		<div className="minimapZoom_zoom">
			Zoom
		</div>
		<div className="minimapZoom_minimap">
			Minimap
		</div>
	</div>
);

MinimapZoomComponent.propTypes = {
	zoom: PropTypes.shape({
		start: PropTypes.number.isRequired,
		end: PropTypes.number.isRequired,
	}).isRequired,
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			data: PropTypes.shape({
				title: PropTypes.string.isRequired,
			}).isRequired,
			state: PropTypes.shape({
				selected: PropTypes.bool.isRequired,
				hovered: PropTypes.bool.isRequired,
			}).isRequired,
		}),
	).isRequired,
	actions: PropTypes.shape({
		setZoomStart: PropTypes.func.isRequired,
		setZoomEnd: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = ({ zoom, events }) => ({ zoom, events });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(zoomActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MinimapZoomComponent);
