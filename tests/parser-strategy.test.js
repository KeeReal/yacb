"use strict";


const should = require("should");
const parsers = require("../parsers");
const GitlabParserStrategy = require("../parsers/gitlab.parser-strategy");


describe("parser-strategy", () => {
    it("throws an error because unknown 'type' has been given", () => {
        (function() {
            parsers.create(null);
        }).should.throw(/Unknown type/);
    });
    
    
    describe("gitlab-parser", () => {
        it("creates GitlatParserStrategy", () => {
            const strategy = parsers.create(parsers.TYPES.GITLAB);
            should(strategy).be.instanceOf(GitlabParserStrategy);
        });
        
        
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
    
    
            it("canceled", () => {
                const mock = require("./mocks/gitlab/build-canceled-event.gitlab.json");
                const result = parse(parsers.TYPES.GITLAB, mock.event);
        
                should(result).be.eql(mock.expected);
            });
    
    
            it("returns 'null' on other cases", () => {
                const mock = require("./mocks/gitlab/build-unknown-event.gitlab.json");
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