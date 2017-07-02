import React from 'react';
import AppContainer from './AppContainer';
import EventsLanes from '../components/EventsLane';
import Sidebar from '../components/Sidebar';
import MinimapZoom from '../components/MinimapZoom';
import Header from '../components/Header';
import TopicsList from '../components/TopicsList';
import TimeDots from '../components/TimeDots';
import IntroScreen from '../components/IntroScreen';

import './App.css';

const App = () => (
	<AppContainer>
		<EventsLanes />
		<MinimapZoom />
		<Sidebar />
		<TopicsList />
		<Header />
		<TimeDots />
		<IntroScreen />
	</AppContainer>
);

export default App;
