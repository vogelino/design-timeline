/* global it, expect */
import * as uiConstants from './uiConstants';

it('should have uppercase variable names', () => {
	Object.keys(uiConstants).forEach((constantKey) =>
		expect(constantKey).toBe(constantKey.toUpperCase()));
});
