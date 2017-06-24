/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import SidebarContent from './SidebarContent';

it('should render without crashing', () => {
	const props = {
		id: 'bababa',
		data: {
			title: 'dolor sit amet',
			text: 'lorem ipsum',
			startDate: new Date(),
			externalLinks: [],
		},
	};
	shallow(<SidebarContent {...props} />);
});
