/* global it  */
import React from 'react';
import { shallow } from 'enzyme';
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
