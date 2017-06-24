/* global test */
import React from 'react';
import { shallow } from 'enzyme';
import { SidebarCategoryComponent as SidebarCategory } from './SidebarCategory';

test('Sidebar renders without crashing', () => {
	shallow(
		<SidebarCategory
			category={{
				title: 'Design Thinking',
				slug: 'design-thinking',
				color: '#BADA55',
			}}
			type="tweet"
		/>
	);
});
