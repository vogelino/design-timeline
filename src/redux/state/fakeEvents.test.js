/* global test, expect */
import fakeEvents from './fakeEvents';

test('calling fakeEvents should generate an array containing btw. 60 and 120 objects', () => {
	expect(fakeEvents.length)
		.toBeGreaterThanOrEqual(60);
	expect(fakeEvents.length)
		.toBeLessThanOrEqual(120);
});

test('events generated with fakeEvents should include 3 major keys: id, data & state', () => {
	fakeEvents.forEach((event) =>
		expect(Object.keys(event)).toEqual(['id', 'data', 'state'])
	);
});

test('all events should have a string id', () => {
	fakeEvents.forEach((event) => {
		expect(event.id).not.toBeUndefined();
		expect(typeof event.id).toBe('string');
	});
});
