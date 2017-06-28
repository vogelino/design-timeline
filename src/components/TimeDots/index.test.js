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
			dots={[]}
			mouseX={0}
			mainTimeline={{
				offset: 0,
				totalWidth: 0,
				minDate: new Date(),
				maxDate: new Date(),
			}}
		/>
	);
});
