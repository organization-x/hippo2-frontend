// helper function to translate backend dj-rest-auth api error JSON object keys
// takes object with key, value: expected-api-key, translated-key
function formatApiErrors(errors, keyMap) {
	const formattedErrors = {};
	for (const key in errors) {
		if (keyMap[key]) {
			formattedErrors[keyMap[key]] = errors[key];
		} else {
			formattedErrors[key] = errors[key];
		}
	}
	return formattedErrors;
}

export default formatApiErrors;
