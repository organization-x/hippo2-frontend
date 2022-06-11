import { nonempty, object, pattern, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

const StudentInformation = object({
	firstName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	lastName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	email: pattern(nonempty(string()), /^\S+@\S+\.\S+$/),
	dob: pattern(nonempty(string()), /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/),
	phone: pattern(nonempty(string()), /^\(\d{3}\)\s\d{3}-\d{4}$/)
});
const ParentInformation = object({
	firstName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	lastName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	email: pattern(nonempty(string()), /^\S+@\S+\.\S+$/),
	phone: pattern(nonempty(string()), /^\(\d{3}\)\s\d{3}-\d{4}$/)
});

const messages = {
	pattern: {
		default: 'This field is invalid'
	},
	nonempty: {
		default: 'This field is required'
	}
};

function validateUserInformation(data, type) {
	const [err, vData] = type === 'student' ? validate(data, StudentInformation) : validate(data, ParentInformation);
	const formattedErr = formatFormErrors(err, messages);
	return [formattedErr, vData];
}

export default validateUserInformation;
