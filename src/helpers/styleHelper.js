import { mandatory } from './helperUtils';

export const combineCssClasses = (classesObject = mandatory('classesObject')) =>
	Object.keys(classesObject)
		.reduce((acc, className) => (
			classesObject[className] ? `${acc} ${className}` : acc
		), '').trim();
