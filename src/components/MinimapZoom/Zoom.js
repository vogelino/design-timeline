import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DraggableCore } from 'react-draggable';
import * as zoomActions from '../../redux/actions/zoomActions';
import * as mainTimelineActions from '../../redux/actions/mainTimelineActions';
import { SIDEBAR_WIDTH, TOPICS_LIST_WIDTH } from '../../redux/constants/uiConstants';
import { getNewStartEndFromDelta } from '../../helpers/timelineHelper';

const HUNDRED_PERCENT = 100;
const DRAG_GRID_SIZE = 1;
const MIN_HANDLERS_SEPARATION = 0.9;

const getWidth = (percentage) => ({
	width: `${percentage}%`,
});
const Zoom = ({
	visiblePercentage,
	startPercentage,
	endPercentage,
	zoomWidth,
	setZoom,
	startDragging: onStart,
	stopDragging: onStop,
}) => {
	const getNewZoom = getNewStartEndFromDelta({
		startPercentage,
		visiblePercentage,
		containerWidth: zoomWidth,
	});
	const draggableCommonProps = {
		grid: [DRAG_GRID_SIZE, 0],
		onStart,
		onStop,
	};
	return (
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
				{...draggableCommonProps}
				onDrag={(evt, { deltaX: delta }) => setZoom(getNewZoom(delta))}
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
				{...draggableCommonProps}
				onDrag={(evt, { deltaX: delta }) => {
					const { start } = getNewZoom(delta);
					const endZoomPercentage = (startPercentage + visiblePercentage)
						- MIN_HANDLERS_SEPARATION;
					setZoom({
						start: start > endZoomPercentage ?
							endZoomPercentage : start,
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
				{...draggableCommonProps}
				onDrag={(evt, { deltaX: delta }) => {
					const { end } = getNewZoom(delta);
					const startZoomPercentage = (
						startPercentage +
						MIN_HANDLERS_SEPARATION
					);
					setZoom({
						end: end < startZoomPercentage ?
							startZoomPercentage : end,
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
};

Zoom.defaultProps = {
	visiblePercentage: 100,
	startPercentage: 0,
	endPercentage: 0,
	zoomWidth: 1000,
	setZoom: (x) => x,
	startDragging: (x) => x,
	stopDragging: (x) => x,
};

Zoom.propTypes = {
	visiblePercentage: PropTypes.number,
	startPercentage: PropTypes.number,
	endPercentage: PropTypes.number,
	zoomWidth: PropTypes.number,
	setZoom: PropTypes.func,
	startDragging: PropTypes.func,
	stopDragging: PropTypes.func,
};

const mapStateToProps = ({
	zoom: { start, end },
	ui: { windowWidth },
}) => ({
	visiblePercentage: end - start,
	startPercentage: start,
	endPercentage: HUNDRED_PERCENT - end,
	zoomWidth: windowWidth - SIDEBAR_WIDTH - TOPICS_LIST_WIDTH,
});
const mapDispatchToProps = (dispatch) => ({
	setZoom: (zoom) => dispatch(zoomActions.setZoom(zoom)),
	startDragging: () => dispatch(mainTimelineActions.startDragging()),
	stopDragging: () => dispatch(mainTimelineActions.stopDragging()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);
