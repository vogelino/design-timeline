/* global test, expect */
import categoriesReducer, { initialCategories } from './categoriesReducer';

test('calling categoriesReducer without arguments should return the initialState', () => {
	expect(categoriesReducer()).toEqual(initialCategories);
});

test('calling categoriesReducer with arguments should return the arguments', () => {
	const args = [];
	expect(categoriesReducer(args)).toBe(args);
});
