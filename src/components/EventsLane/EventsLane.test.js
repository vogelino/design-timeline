/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import EventsLane from './EventsLane';

it('renders without crashing', () => {
	shallow(<EventsLane />);
});
