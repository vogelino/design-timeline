/* global it, expect */
import { combineCssClasses } from './styleHelper';

it('should combine classes by object key holding a truthy value', () => {
	expect(combineCssClasses({
		one: true,
		two: 'yeah!',
		three: null,
		four: undefined,
		five: 0,
		six: 23,
		seven: {},
		eight: [],
		nine: '',
	})).toBe('one two six seven eight');
});
