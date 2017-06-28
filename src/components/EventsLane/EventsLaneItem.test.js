/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import EventsLaneItem from './EventsLaneItem';

it('renders without crashing', () => {
	shallow(<EventsLaneItem id="a" />);
});
