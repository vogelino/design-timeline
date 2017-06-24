/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import SelectMessage from './SelectMessage';

it('should render without crashing', () => {
	shallow(<SelectMessage />);
});
