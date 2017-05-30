import React from 'react';
import EventsLanes from '../components/EventsLane';
import MainSidebar from '../components/Sidebar';
import './App.css';

const App = () => (
	<div className="appContainer">
		<MainSidebar />
		<EventsLanes />
	</div>
);

export default App;
