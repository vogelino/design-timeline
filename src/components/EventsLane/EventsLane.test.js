/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { EventsLane } from './EventsLane';
import eventsInitalState from '../../redux/state/fakeEvents';
import * as actions from '../../redux/actions/eventsActions';

it('renders without crashing', () => {
	shallow(
		<EventsLane
			events={eventsInitalState}
			actions={actions}
			scaleFunc={(x) => x}
			color={'#BADA55'}
		/>
	);
});
