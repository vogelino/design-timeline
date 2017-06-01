/* global it, expect */
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

it('adds the events-lane_item--key-event class if event has a truthy keyEvent prop', () => {
	const keyEvent = true;
	const data = Object.assign({}, defaultComponentProps.data, { keyEvent });
	const wrapper = shallow(createTestComponent({ data }));
	expect(wrapper.hasClass('events-lane_item--key-event')).toBe(keyEvent);
});

it('should not add the events-lane_item--key-event class if event has a falsy keyEvent prop', () => {
	const keyEvent = false;
	const data = Object.assign({}, defaultComponentProps.data, { keyEvent });
	const wrapper = shallow(createTestComponent({ data }));
	expect(wrapper.hasClass('events-lane_item--key-event')).toBe(keyEvent);
});
