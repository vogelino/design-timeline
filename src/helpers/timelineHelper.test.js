/* global it, expect, describe */
import { getTimelineZoomOptions } from './timelineHelper';

const getParametersObject = (toMerge = {}) => Object.assign({}, {
	width: 100,
	zoomStart: 0,
	zoomEnd: 0,
	minDate: new Date('01.01.1999'),
	maxDate: new Date('01.01.2017'),
}, toMerge);

describe('getTimelineZoomOptions', () => {
	it('throws error with missing mandatory parameter', () => {
		expect(() => {
			getTimelineZoomOptions();
		}).toThrowError('Missing mandatory parmeter: "main object!!"');
	});

	it('throws error with missing parameter keys', () => {
		expect(() => getTimelineZoomOptions(getParametersObject({
			zoomStart: undefined,
		}))).toThrowError('Missing mandatory parmeter: "zoomStart!!"');
		expect(() => getTimelineZoomOptions(getParametersObject({
			zoomEnd: undefined,
		}))).toThrowError('Missing mandatory parmeter: "zoomEnd!!"');
		expect(() => getTimelineZoomOptions(getParametersObject({
			width: undefined,
		}))).toThrowError('Missing mandatory parmeter: "width!!"');
		expect(() => getTimelineZoomOptions(getParametersObject({
			minDate: undefined,
		}))).toThrowError('Missing mandatory parmeter: "minDate!!"');
		expect(() => getTimelineZoomOptions(getParametersObject({
			maxDate: undefined,
		}))).toThrowError('Missing mandatory parmeter: "maxDate!!"');
	});

	it('returns the same width as given', () => {
		const expectedWidth = 100;
		const { width } = getTimelineZoomOptions(getParametersObject({
			width: expectedWidth,
		}));
		expect(width).toEqual(expectedWidth);
	});

	it('returns the calculated totalWidth based on the params', () => {
		const { totalWidth } = getTimelineZoomOptions(getParametersObject({
			zoomStart: 20,
			zoomEnd: 80,
			width: 600,
		}));
		const expectedTotalWidth = 1000;
		expect(totalWidth).toEqual(expectedTotalWidth);
	});

	it('returns the calculated offset based on the params', () => {
		const { offset } = getTimelineZoomOptions(getParametersObject({
			zoomStart: 20,
			zoomEnd: 80,
			width: 600,
		}));
		const expectedOffset = 200;
		expect(offset).toEqual(expectedOffset);
	});

	it('returns a scale function', () => {
		const { scaleFunction } = getTimelineZoomOptions(getParametersObject());
		expect(typeof scaleFunction).toBe('function');
	});
});
