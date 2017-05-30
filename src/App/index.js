import React from 'react';
import EventsLanes from '../components/EventsLane';
import ZoomControl from '../components/ZoomControl';
import Sidebar from '../components/Sidebar';
import './App.css';

const App = () => (
	<div className="appContainer">
		<Sidebar />
		<ZoomControl />
		<EventsLanes />
	</div>
);

export default App;
