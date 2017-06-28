export const mandatory = (parameterName) => {
	throw new Error(`Missing mandatory parmeter: "${parameterName}!!"`);
};
