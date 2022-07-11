import { nonempty, object, pattern, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

const Email = object({
	email: pattern(nonempty(string()), /^\S+@\S+\.\S+$/)
});

const messages = {
	pattern: {
		default: 'This field is invalid'
	},
	nonempty: {
		default: 'This field is required'
	}
};

function validateEmail(data) {
	const [err, vData] = validate(data, Email);
	const formattedErr = formatFormErrors(err, messages);
	return [formattedErr, vData];
}

export default validateEmail;
