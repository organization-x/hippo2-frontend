import { nonempty, object, pattern, size, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

const UserSignup = object({
	email: pattern(nonempty(string()), /^\S+@\S+\.\S+$/),
	firstName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	lastName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	type: pattern(nonempty(string()), /^(STUDENT|PARENT)$/),
	password: size(nonempty(string()), 7, Infinity)
});

const messages = {
	pattern: {
		default: 'This field is invalid'
	},
	nonempty: {
		default: 'This field is required'
	},
	size: {
		password: 'Password length must be more than 7'
	}
};

function validateUserSignup(data) {
	const [err, vData] = validate(data, UserSignup);
	const formattedErr = formatFormErrors(err, messages);
	return [formattedErr, vData];
}

export default validateUserSignup;
