/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { EventsLanesModule } from './index';
import { initialCategories } from '../../redux/reducers/categoriesReducer';
import eventsInitalState from '../../redux/state/fakeEvents';

it('renders without crashing', () => {
	shallow(
		<EventsLanesModule
			events={eventsInitalState}
			categories={initialCategories}
		/>
	);
});
