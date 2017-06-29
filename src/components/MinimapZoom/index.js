import React from 'react';
import Minimap from './Minimap';
import Zoom from './Zoom';
import './MinimapZoom.css';

export default () => (
	<div className="minimapZoom">
		<div className="minimapZoom_wrapper">
			<Minimap />
			<Zoom />
		</div>
	</div>
);
