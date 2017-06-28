/* global test */
import React from 'react';
import { shallow } from 'enzyme';
import MinimapZoom from './index';

test('Sidebar renders without crashing', () => {
	shallow(<MinimapZoom />);
});
