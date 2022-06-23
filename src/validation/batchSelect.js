import { nonempty, pattern, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

const BatchID = pattern(nonempty(string()), /^[a-f0-9-]+$/);

const messages = {
    pattern: {
	default: 'Batch ID is invalid'
    },
    nonempty: {
	default: 'Please select a batch first'
    }
};

function validateBatchSelect(batchID) {
	const [err, vData] = validate(batchID, BatchID);
	const formattedErr = formatFormErrors(err, messages);
	return [formattedErr, vData];
}

export default validateBatchSelect;
