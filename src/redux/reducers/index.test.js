/* global test, expect */
import rootReducer from './index';

test('root reducer should return an object with all reducer keys', () => {
	expect(Object.keys(rootReducer())).toEqual([
		'events',
		'categories',
		'zoom',
	]);
});
