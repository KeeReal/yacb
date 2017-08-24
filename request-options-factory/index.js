"use strict";


const SlackRequestOptionsFactory = require("./slack.request-options-factory");



const TYPES = {
    SLACK: "slack"
};


exports.TYPES = TYPES;


/**
 * @param {string} type
 * @param {object} [config]
 * @returns {RequestOptionsFactory}
 */
exports.create = (type, config) => {
    switch (type) {
        case TYPES.SLACK: return new SlackRequestOptionsFactory(config);
    }
    
    throw new Error(`Unknown type of request-option-factory '${type}'`);
};