import { nonempty, pattern, string, validate } from "superstruct";
import formatFormErrors from "./formatFormErrors";

// validates for uuid
const Uuid = pattern(
  nonempty(string()), 
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
);

const messages = {
    pattern: {
        default: 'This field is invalid'
    },
    nonempty: {
        default: 'This field is required'
    }
};

function validateUuid(id) {
    const [err, vId] = validate(id, Uuid);
    const formattedErr = formatFormErrors(err, messages);
    return [formattedErr, vId];
}

export default validateUuid;
