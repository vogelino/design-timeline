import React from 'react';
import EventsLanes from '../components/EventsLane';
import Sidebar from '../components/Sidebar';
import './App.css';

const App = () => (
	<div className="appContainer">
		<Sidebar />
		<EventsLanes />
	</div>
);

export default App;
