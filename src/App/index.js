import React from 'react';
import EventsLanes from '../components/EventsLane';
import Sidebar from '../components/Sidebar';
import MinimapZoom from '../components/MinimapZoom';
import './App.css';

const App = () => (
	<div className="appContainer">
		<Sidebar />
		<MinimapZoom />
		<EventsLanes />
	</div>
);

export default App;
