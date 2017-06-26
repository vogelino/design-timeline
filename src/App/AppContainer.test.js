/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { AppContainerComponent } from './AppContainer';

it('renders without crashing', () => {
	shallow(<AppContainerComponent />);
});
