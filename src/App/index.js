import React from 'react';
import EventsLanes from '../components/EventsLane';
import Sidebar from '../components/Sidebar';
import MinimapZoom from '../components/MinimapZoom';
import Header from '../components/Header';
import './App.css';

const App = () => (
	<div className="appContainer">
		<Header />
		<Sidebar />
		<MinimapZoom />
		<EventsLanes />
	</div>
);

export default App;
