import { nonempty, object, pattern, size, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

const UserLogin = object({
	email: pattern(nonempty(string()), /^\S+@\S+\.\S+$/),
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

function validateUserLogin(data) {
	const [err, vData] = validate(data, UserLogin);
	const formattedErr = formatFormErrors(err, messages);
	return [formattedErr, vData];
}

export default validateUserLogin;
