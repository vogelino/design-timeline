/* global it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import SidebarLinksList from './SidebarLinksList';

it('should render without crashing', () => {
	shallow(<SidebarLinksList externalLinks={[]} />);
});

it('should render as much links as provided', () => {
	const list = shallow(<SidebarLinksList externalLinks={['a', 'b']} />);
	expect(list.find('.sidebar_externallink').length).toBe(2);
});
