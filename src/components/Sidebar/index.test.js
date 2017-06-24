/* global test */
import React from 'react';
import { shallow } from 'enzyme';
import { SidebarComponent as Sidebar } from './index';
import eventsInitalState from '../../redux/state/fakeEvents';

test('Sidebar renders without crashing', () => {
	shallow(<Sidebar {...eventsInitalState[0]} />);
});
