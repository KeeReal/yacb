"use strict";


const GitlabToSlackMessageFactory = require("./gitlab-to-slack.message-factory");



const TYPES = {
    GITLAB_TO_SLACK: "gitlab-to-slack"
};


exports.TYPES = TYPES;


/**
 * @param type
 * @returns {MessageFactory}
 */
exports.create = type => {
    switch (type) {
        case TYPES.GITLAB_TO_SLACK: return new GitlabToSlackMessageFactory();
    }
    throw new Error(`Unknown type '${type}'`);
};