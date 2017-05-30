/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { EventsLaneComponent } from './EventsLane';
import eventsInitalState from '../../redux/state/fakeEvents';
import * as actions from '../../redux/actions/eventsActions';

it('renders without crashing', () => {
	shallow(
		<EventsLaneComponent
			events={eventsInitalState}
			actions={actions}
			scaleFunc={(x) => x}
			color={'#BADA55'}
			width={4000}
		/>
	);
});
