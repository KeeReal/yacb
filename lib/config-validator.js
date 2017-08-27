"use strict";


const _ = require("underscore");
const Ajv = require("ajv");

const ajv = new Ajv({allErrors: true});
const validateFunction = ajv.compile(require("./config-validator.schema.json"));


exports.validate = json => {
    const valid = validateFunction(json);
    if (!valid) {
        return formatErrors(validateFunction.errors);
    }
    return null;
};


function formatErrors(errors) {
    return _.chain(errors)
        .filter(v => _.has(v, "dataPath") && _.has(v, "message"))
        .map(v => `${v.dataPath ? `'${v.dataPath}' ` : ""}${v.message}`)
        .value()
        .join(",");
}