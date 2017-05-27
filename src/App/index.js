import React from 'react';
import './App.css';
import EventsList from '../components/EventsList';
import Sidebar from '../components/Sidebar';

const App = () => (
	<div className="app-container">
		<Sidebar />
		<EventsList />
	</div>
);

export default App;
