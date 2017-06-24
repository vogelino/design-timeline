import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import fakeEvents from './redux/state/fakeEvents';

import App from './App';
import './fonts.css';
import './index.css';

const store = configureStore({ events: fakeEvents });
export const AppContainer = () => (
	<Provider store={store}>
		<App />
	</Provider>
);
if (document.body.contains(document.getElementById('root'))) {
	ReactDOM.render(<AppContainer />, document.getElementById('root'));
}
