/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { TimeDotsContainerComponent } from './index';
import { initialCategories } from '../../redux/reducers/categoriesReducer';
import eventsInitalState from '../../redux/state/fakeEvents';

it('renders without crashing', () => {
	shallow(
		<TimeDotsContainerComponent
			events={eventsInitalState}
			categories={initialCategories}
			zoom={{ start: 0, end: 100 }}
			dots={[]}
			mouseX={0}
			ui={{ timelineWidth: 0 }}
		/>
	);
});
