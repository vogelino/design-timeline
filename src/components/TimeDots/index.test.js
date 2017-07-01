/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { TimeDotsContainerComponent } from './index';

it('renders without crashing', () => {
	shallow(
		<TimeDotsContainerComponent />
	);
});
