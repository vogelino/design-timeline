/* global test */
import React from 'react';
import { shallow } from 'enzyme';
import SidebarImage from './SidebarImage';

test('Sidebar renders without crashing', () => {
	shallow(<SidebarImage url="image" />);
});
