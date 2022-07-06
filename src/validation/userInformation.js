import { nonempty, object, pattern, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

const StudentInformation = object({
	fName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	lName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	email: pattern(nonempty(string()), /^\S+@\S+\.\S+$/),
	type: pattern(nonempty(string()), /^(STUDENT|PARENT)$/),
	phone: pattern(nonempty(string()), /^\+?1?\d{9,15}$/),
	dob: pattern(nonempty(string()), /^(0?[1-9]|1[0-2])\/(19|20)\d{2}$/)
});
const ParentInformation = object({
	fName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	lName: pattern(nonempty(string()), /^[a-zA-Z]*$/),
	email: pattern(nonempty(string()), /^\S+@\S+\.\S+$/),
	phone: pattern(nonempty(string()), /^\+?1?\d{9,15}$/),
	type: pattern(nonempty(string()), /^(STUDENT|PARENT)$/)
});

const messages = {
	pattern: {
		default: 'This field is invalid',
		dob: 'Please enter valid date in "MM/YYYY" format (e.g. 02/2003)'
	},
	nonempty: {
		default: 'This field is required'
	}
};

function validateUserInformation(data, type) {
	const schema = type !== 'PARENT' ? StudentInformation : ParentInformation;
	const [err, vData] = validate(data, schema);
	const formattedErr = formatFormErrors(err, messages);
	return [formattedErr, vData];
}

export default validateUserInformation;
