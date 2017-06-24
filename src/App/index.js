import React from 'react';
import EventsLanes from '../components/EventsLane';
import Sidebar from '../components/Sidebar';
import MinimapZoom from '../components/MinimapZoom';
import Header from '../components/Header';
import TopicsList from '../components/TopicsList';
import './App.css';

const App = () => (
	<div className="appContainer">
		<Header />
		<Sidebar />
		<MinimapZoom />
		<EventsLanes />
		<TopicsList />
	</div>
);

export default App;
