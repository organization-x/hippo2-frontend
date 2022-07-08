import { nonempty, size, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

// validates for uuid
const Password = size(nonempty(string()), 7, Infinity);

const messages = {
	pattern: {
		default: 'This field is invalid'
	},
	nonempty: {
		default: 'This field is required'
	},
	size: {
		default: 'Password length must be more than 7'
	}
};

function validatePassword(password) {
	const [err, vPassword] = validate(password, Password);
	const formattedErr = formatFormErrors(err, messages, true);
	return [formattedErr, vPassword];
}

export default validatePassword;
