/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import { TopicsListComponent as TopicsList } from './index';
import { initialCategories } from '../../redux/reducers/categoriesReducer';

it('should render without crashing', () => {
	shallow(<TopicsList categories={initialCategories} />);
});
