import React from 'react';
import './App.css';
import EventsList from '../components/EventsList';
import Sidebar from '../components/Sidebar';

const App = () => (
	<div className="appContainer">
		<Sidebar />
		<EventsList />
	</div>
);

export default App;
