"use strict";


const consts = require("../consts");
const GitlabToSlackMessageFactory = require("./gitlab-to-slack.message-factory");



/**
 * @param {string} source
 * @param {string} destination
 * @returns {MessageFactory}
 */
exports.create = (source, destination) => {
    if (source === consts.TYPES.GITLAB && destination === consts.TYPES.SLACK) {
        return new GitlabToSlackMessageFactory();
    }
    
    throw new Error(`Unknown pair '${source} -> ${destination}'`);
};