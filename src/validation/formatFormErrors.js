// helper function to format superstruct errors into user-understandable messages
// takes messages object to map messages
// e.g.:  
// const messages = {
// 	nonempty: {
// 		default: 'This field is required',
// 		password: 'No password provided'
// 	}
// }

function formatFormErrors(err, messages) {
	if (err) {
		const formattedErrors = {};
		const errors = err.failures();
		for (let i = 0; i < errors.length; i++) {
			if (!formattedErrors[errors[i].key]) {
				formattedErrors[errors[i].key] = [];
			}
			if (messages[errors[i].refinement]) {
				if (messages[errors[i].refinement][errors[i].key]) {
					formattedErrors[errors[i].key].push(messages[errors[i].refinement][errors[i].key]);
				} else {
					formattedErrors[errors[i].key].push(messages[errors[i].refinement].default);
				}
			} else {
				formattedErrors[errors[i].key].push('This field is invalid');
			}
		}
		return formattedErrors;
	}
	return err
}

export default formatFormErrors;
