import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as zoomActions from '../../redux/actions/zoomActions';
import './ZoomControl.css';

export const ZoomControlComponent = ({
	zoomLevel,
	actions,
}) => (
	<form className="zoomControl">
		<label htmlFor="zoomLevel">
			Zoom level
		</label>
		<input
			className="zoomControl_input"
			type="range"
			min="20"
			max="200"
			value={zoomLevel}
			id="zoomLevel"
			onChange={({ target: { value } }) =>
				actions.setZoomLevel(Number(value))}
		/>
		<output className="zoomControl_output">
			{zoomLevel} %
		</output>
	</form>
);

ZoomControlComponent.propTypes = {
	actions: PropTypes.shape({
		setZoomLevel: PropTypes.func.isRequired,
	}).isRequired,
	zoomLevel: PropTypes.number.isRequired,
};

const mapStateToProps = ({ zoom: { level: zoomLevel } }) => ({ zoomLevel });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(zoomActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ZoomControlComponent);
