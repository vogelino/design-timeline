/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { EventsLanesComponent } from './index';
import { initialCategories } from '../../redux/reducers/categoriesReducer';
import eventsInitalState from '../../redux/state/fakeEvents';

it('renders without crashing', () => {
	shallow(
		<EventsLanesComponent
			events={eventsInitalState}
			categories={initialCategories}
			zoom={{ start: 0, end: 100 }}
			setZoomStart={() => {}}
			actions={{ setMouseCoordinates: (x) => x, setZoom: (x) => x }}
			ui={{ timelineWidth: 0 }}
		/>
	);
});
