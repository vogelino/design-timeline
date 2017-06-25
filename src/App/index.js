import React from 'react';
import EventsLanes from '../components/EventsLane';
import Sidebar from '../components/Sidebar';
import MinimapZoom from '../components/MinimapZoom';
import Header from '../components/Header';
import TopicsList from '../components/TopicsList';
import TimeDots from '../components/TimeDots';
import './App.css';

const App = () => (
	<div className="appContainer">
		<EventsLanes />
		<MinimapZoom />
		<Sidebar />
		<TopicsList />
		<Header />
		<TimeDots />
	</div>
);

export default App;
