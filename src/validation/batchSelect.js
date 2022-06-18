import { nonempty, object, pattern, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

const BatchSelect = object({
    batchID: pattern(nonempty(string()), /^[a-f0-9-]+$/),
});

const messages = {
    pattern: {
	default: 'Batch ID is invalid'
    },
    nonempty: {
	default: 'Please select a batch first'
    }
};

function validateBatchSelect(batchID) {
	const [err, vData] = validate({'batchID' : batchID}, BatchSelect);
	const formattedErr = formatFormErrors(err, messages);
	return [formattedErr, vData];
}

export default validateBatchSelect;
