import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DraggableCore } from 'react-draggable';
import * as zoomActions from '../../redux/actions/zoomActions';
import { SIDEBAR_WIDTH } from '../../redux/constants/uiConstants';

const HUNDRED_PERCENT = 100;
const DRAG_GRID_SIZE = 1;
const MIN_HANDLERS_SEPARATION = 0.9;

const getZoomByDelta = ({
	delta = 0,
	percentage = 100,
	width = 1000,
}) => {
	const oldZoomInPixels = (percentage / HUNDRED_PERCENT) * width;
	const newZoomInPixels = oldZoomInPixels + delta;
	const newZoomInPercent = (newZoomInPixels * HUNDRED_PERCENT) / width;
	if (newZoomInPercent < 0) return 0;
	if (newZoomInPercent > HUNDRED_PERCENT) return HUNDRED_PERCENT;
	return newZoomInPercent;
};

const getWidth = (percentage) => ({
	width: `${percentage}%`,
});
const Zoom = ({
	visiblePercentage,
	startPercentage,
	endPercentage,
	zoomWidth,
	setZoom,
}) => (
	<div className="zoom">
		<div
			className="zoom_startoffset"
			style={getWidth(startPercentage)}
		/>
		<div
			className="zoom_endoffset"
			style={getWidth(endPercentage)}
		/>
		<DraggableCore
			grid={[DRAG_GRID_SIZE, 0]}
			onDrag={(evt, { deltaX: delta }) => {
				let newStartZoomPercentage = getZoomByDelta({
					delta,
					percentage: startPercentage,
					width: zoomWidth,
				});
				let newEndZoomPercentage = getZoomByDelta({
					delta,
					percentage: startPercentage + visiblePercentage,
					width: zoomWidth,
				});
				if (newStartZoomPercentage === 0) {
					newEndZoomPercentage = visiblePercentage;
				}
				if (newEndZoomPercentage === HUNDRED_PERCENT) {
					newStartZoomPercentage = HUNDRED_PERCENT - visiblePercentage;
				}
				setZoom({
					start: newStartZoomPercentage,
					end: newEndZoomPercentage,
				});
			}}
		>
			<div
				className="zoom_visiblepart"
				style={{
					...getWidth(visiblePercentage),
					left: `${startPercentage}%`,
				}}
			/>
		</DraggableCore>
		<DraggableCore
			grid={[DRAG_GRID_SIZE, 0]}
			onDrag={(evt, { deltaX: delta }) => {
				const newStartZoomPercentage = getZoomByDelta({
					delta,
					percentage: startPercentage,
					width: zoomWidth,
				});
				const endZoomPercentage = (startPercentage + visiblePercentage)
					- MIN_HANDLERS_SEPARATION;
				setZoom({
					start: newStartZoomPercentage > endZoomPercentage ?
						endZoomPercentage : newStartZoomPercentage,
				});
			}}
		>
			<div
				className="zoom_startHandler zoom_handler"
				style={{ left: `${startPercentage}%` }}
			>
				<div className="zoom_handlerwrapper">
					<span className="zoom_handlerbar" />
					<span className="zoom_handlergrabber" />
					<span className="zoom_handlerdate" />
				</div>
			</div>
		</DraggableCore>
		<DraggableCore
			grid={[DRAG_GRID_SIZE, 0]}
			onDrag={(evt, { deltaX: delta }) => {
				const newEndZoomPercentage = getZoomByDelta({
					delta,
					percentage: startPercentage + visiblePercentage,
					width: zoomWidth,
				});
				const startZoomPercentage = (
					startPercentage +
					MIN_HANDLERS_SEPARATION
				);
				setZoom({
					end: newEndZoomPercentage < startZoomPercentage ?
						startZoomPercentage : newEndZoomPercentage,
				});
			}}
		>
			<div
				className="zoom_endHandler zoom_handler"
				style={{ right: `${endPercentage}%` }}
			>
				<div className="zoom_handlerwrapper">
					<span className="zoom_handlerbar" />
					<span className="zoom_handlergrabber" />
					<span className="zoom_handlerdate" />
				</div>
			</div>
		</DraggableCore>
	</div>
);

Zoom.defaultProps = {
	visiblePercentage: 100,
	startPercentage: 0,
	endPercentage: 0,
	zoomWidth: 1000,
	setZoom: (x) => x,
};

Zoom.propTypes = {
	visiblePercentage: PropTypes.number,
	startPercentage: PropTypes.number,
	endPercentage: PropTypes.number,
	zoomWidth: PropTypes.number,
	setZoom: PropTypes.func,
};

const mapStateToProps = ({
	zoom: { start, end },
	ui: { windowWidth },
}) => ({
	visiblePercentage: end - start,
	startPercentage: start,
	endPercentage: HUNDRED_PERCENT - end,
	zoomWidth: windowWidth - SIDEBAR_WIDTH,
});
const mapDispatchToProps = (dispatch) => ({
	setZoom: bindActionCreators(zoomActions, dispatch).setZoom,
});

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);
