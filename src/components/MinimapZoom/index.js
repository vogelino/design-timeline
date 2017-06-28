import React from 'react';
import Minimap from './Minimap';
import Zoom from './Zoom';

export default () => (
	<div className="minimapZoom">
		<Zoom />
		<Minimap />
	</div>
);
