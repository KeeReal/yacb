"use strict";


const consts = require("../consts");
const SlackRequestOptionsFactory = require("./slack.request-options-factory");



/**
 * @param {string} type
 * @param {object} [config]
 * @returns {RequestOptionsFactory}
 */
exports.create = (type, config) => {
    switch (type) {
        case consts.TYPES.SLACK: return new SlackRequestOptionsFactory(config);
    }
    
    throw new Error(`Unknown type of request-option-factory '${type}'`);
};