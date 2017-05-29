/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import EventsLaneItem from './EventsLaneItem';
import eventsInitalState from '../../redux/state/fakeEvents';

it('renders without crashing', () => {
	const { id, data, state } = eventsInitalState[0];
	shallow(
		<EventsLaneItem
			id={id}
			data={data}
			state={state}
			scaleFunc={(x) => x}
			color={'#BADA55'}
		/>
	);
});
