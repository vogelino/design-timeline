/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import Icon from './index';

it('should render without crashing', () => {
	shallow(<Icon iconId="audio" />);
});
