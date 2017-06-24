/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { TopicsListComponent as TopicsList } from './index';

it('should render without crashing', () => {
	shallow(<TopicsList />);
});
