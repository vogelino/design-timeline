/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import TimeDots from './TimeDots';

it('renders without crashing', () => {
	shallow(<TimeDots
		dots={[{
			position: 0,
			color: '#BADA55',
			key: 'wefwf',
			tooltipContent: 'tooltip',
			offset: 0,
		}]}
	/>);
});
