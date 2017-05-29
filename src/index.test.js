/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from './index';

it('renders without crashing', () => {
	shallow(<AppContainer />);
});
