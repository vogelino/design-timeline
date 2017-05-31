/* global it, expect, jest  */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ZoomControlComponent as ZoomControl } from './index';
import * as zoomActions from '../../redux/actions/zoomActions';

it('should render without crashing', () => {
	shallow(
		<ZoomControl
			actions={zoomActions}
			zoomLevel={100}
		/>
	);
});

it('should call setZoomLevel on slider change', () => {
	const mockSetZoom = jest.fn();
	const shallowedComponent = shallow(
		<ZoomControl
			actions={{
				setZoomLevel: mockSetZoom,
			}}
			zoomLevel={100}
		/>
	);
	shallowedComponent.find('.zoomControl_input').simulate('change', {
		target: { value: 200 },
	});
	expect(mockSetZoom.mock.calls.length).toBe(1);
});

it('should display the output in percentage', () => {
	const shallowedComponent = shallow(
		<ZoomControl
			actions={zoomActions}
			zoomLevel={100}
		/>
	);
	expect(shallowedComponent.find('.zoomControl_output').text()).toBe('100 %');
});

it('should use the zoomLevel prop as the input value', () => {
	const shallowedComponent = mount(
		<ZoomControl
			actions={zoomActions}
			zoomLevel={100}
		/>
	);
	expect(
		shallowedComponent
			.find('.zoomControl_input')
			.get(0).value
	).toBe('100');
});
