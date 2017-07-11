/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { IntroScreenComponent as IntroScreen } from './index';

it('should render without crashing', () => {
	shallow(<IntroScreen visible />);
});
