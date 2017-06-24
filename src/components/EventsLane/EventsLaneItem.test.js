/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import EventsLaneItem from './EventsLaneItem';
import eventsInitalState from '../../redux/state/fakeEvents';

const defaultComponentProps = {
	...eventsInitalState[0],
	scaleFunc: (x) => x,
	color: '#BADA55',
};
const createTestComponent = ({
	id = defaultComponentProps.id,
	data = defaultComponentProps.data,
	state = defaultComponentProps.state,
	scaleFunc = defaultComponentProps.scaleFunc,
	color = defaultComponentProps.color,
} = defaultComponentProps) => (
	<EventsLaneItem {...{ id, data, state, scaleFunc, color }} />
);

it('renders without crashing', () => {
	shallow(createTestComponent());
});
