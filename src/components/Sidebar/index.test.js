/* global test */
import React from 'react';
import { shallow } from 'enzyme';
import { Sidebar, SidebarContent, SelectMessage } from './index';
import eventsInitalState from '../../redux/state/fakeEvents';

test('Sidebar renders without crashing', () => {
	shallow(<Sidebar {...eventsInitalState[0]} />);
});

test('SelectMessage renders without crashing', () => {
	shallow(<SelectMessage />);
});

test('SidebarContent renders without crashing', () => {
	shallow(<SidebarContent {...eventsInitalState[0]} />);
});
