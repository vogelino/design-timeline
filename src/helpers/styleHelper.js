export const combineCssClasses = (classesObject) => Object.keys(classesObject)
	.reduce((acc, className) =>
		(classesObject[className] ? `${acc} ${className}` : acc), ''
	).trim();
