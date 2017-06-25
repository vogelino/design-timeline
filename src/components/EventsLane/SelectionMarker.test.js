/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import SelectionMarker from './SelectionMarker';

it('renders without crashing', () => {
	shallow(
		<SelectionMarker
			date={new Date()}
			scaleFunc={(x) => x}
			color="#BADA55"
		/>
	);
});
