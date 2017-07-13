/* global it */
import React from 'react';
import { shallow } from 'enzyme';
import ScrollArea from './index';

it('should render without crashing', () => {
	shallow(<ScrollArea>blabla</ScrollArea>);
});
