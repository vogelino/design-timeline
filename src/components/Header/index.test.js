/* global it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent as Header } from './index';

it('should render without crashing', () => {
	shallow(<Header />);
});

it('should contain the title', () => {
	const header = shallow(<Header />);
	expect(header.find('.header_title').length).toBe(1);
});

it('should contain the info link', () => {
	const header = shallow(<Header />);
	expect(header.find('.header_infolink').length).toBe(1);
});

it('should contain the legend, legend items and symbols', () => {
	const header = shallow(<Header />);
	expect(header.find('.header_legend').length).toBe(1);
	expect(header.find('.header_legenditem').length).toBe(3);
	expect(header.find('.header_legenditemsymbol').length).toBe(3);
});
