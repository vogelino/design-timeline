/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import EventsLaneTooltip from './EventsLaneTooltip';

it('should render without crashing', () => {
	shallow(<EventsLaneTooltip
		iconId="audio"
		content="bla"
		color="#BADA55"
	/>);
});
