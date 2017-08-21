"use strict";


const should = require("should");
const parsers = require("../parsers");


describe("parser-strategy", () => {
    describe("gitlab-parser", () => {
        describe("parse given event", () => {
            it("push", () => {
                const mock = require("./mocks/gitlab/push-event.gitlab.json");
                const result = parse(parsers.TYPES.GITLAB, mock.event);
                
                should(result).be.eql(mock.expected);
            });
    
    
            it("running", () => {
                const mock = require("./mocks/gitlab/build-running-event.gitlab.json");
                const result = parse(parsers.TYPES.GITLAB, mock.event);
        
                should(result).be.eql(mock.expected);
            });
    
    
            it("success", () => {
                const mock = require("./mocks/gitlab/build-success-event.gitlab.json");
                const result = parse(parsers.TYPES.GITLAB, mock.event);
        
                should(result).be.eql(mock.expected);
            });
    
    
            it("failed", () => {
                const mock = require("./mocks/gitlab/build-failed-event.gitlab.json");
                const result = parse(parsers.TYPES.GITLAB, mock.event);
        
                should(result).be.eql(mock.expected);
            });
        });
    });
});


function parse(type, json) {
    const strategy = parsers.create(type);
    return strategy.parse(json);
}