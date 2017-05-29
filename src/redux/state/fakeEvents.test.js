/* global test, expect */
import fakeEvents from './fakeEvents';

test('calling fakeEvents should generate an array containing btw. 60 and 120 objects', () => {
	expect(fakeEvents.length)
		.toBeGreaterThanOrEqual(60);
	expect(fakeEvents.length)
		.toBeLessThanOrEqual(120);
});
