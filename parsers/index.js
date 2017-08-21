"use strict";


const GitlabParserStrategy = require("./gitlab.parser-strategy");



const TYPES = {
    GITLAB: "gitlab"
};


exports.TYPES = TYPES;


exports.create = type => {
    switch (type) {
        case TYPES.GITLAB: return new GitlabParserStrategy();
    }
    throw new Error("Unknown type,", type);
};