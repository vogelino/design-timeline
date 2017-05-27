import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import fakeEvents from './redux/state/fakeEvents';

import App from './App';
import './index.css';

const store = configureStore({ events: fakeEvents });
ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById('root'),
);
