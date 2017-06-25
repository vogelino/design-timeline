/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from './index';

it('should render without crashing', () => {
	shallow(<Tooltip
		iconId="audio"
		content="bla"
		color="#BADA55"
	/>);
});
