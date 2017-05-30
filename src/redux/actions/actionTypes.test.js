/* global it, expect */
import * as types from './actionTypes';

it('should only export string values', () => {
	const typesArray = Array.from(types);
	expect(typesArray.every((value) =>
		typeof value === 'string' &&
		Boolean(value))
	).toBe(true);
});

it('should export the same keys as the values', () => {
	const typesArray = Array.from(types);
	Object.keys(typesArray).forEach((key) => {
		expect(key).toBe(typesArray[key]);
	});
});
