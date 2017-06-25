/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import TopicDescription from './TopicDescription';

it('should render without crashing', () => {
	shallow(<TopicDescription title="a" description="b" color="c" />);
});
