"use strict";


const should = require("should");
const factories = require("../lib/message-factories");
const consts = require("../lib/consts");
const GitlabToSlackMessageFactory = require("../lib/message-factories/gitlab-to-slack.message-factory");


describe("message-factory", () => {
    it("throws an error because unknown 'type' has been given", () => {
        (function() {
            factories.create(null, null);
        }).should.throw(/Unknown pair/);
    });
    
    
    describe("gitlab-to-slack-message-factory", () => {
        it("creates GitlatParserStrategy", () => {
            const factory = factories.create(consts.TYPES.GITLAB, consts.TYPES.SLACK);
            should(factory).be.instanceOf(GitlabToSlackMessageFactory);
        });
        
        
        describe("parses given event and returns expected message body", () => {
            it("push", () => {
                const mock = require("./mocks/gitlab/push-event.gitlab.json");
                const result = createGitlabToSlackMessage(mock.event);
                
                should(result).be.eql(mock.expected);
            });
    
    
            it("running", () => {
                const mock = require("./mocks/gitlab/build-running-event.gitlab.json");
                const result = createGitlabToSlackMessage(mock.event);
        
                should(result).be.eql(mock.expected);
            });
    
    
            it("success", () => {
                const mock = require("./mocks/gitlab/build-success-event.gitlab.json");
                const result = createGitlabToSlackMessage(mock.event);
        
                should(result).be.eql(mock.expected);
            });
    
    
            it("failed", () => {
                const mock = require("./mocks/gitlab/build-failed-event.gitlab.json");
                const result = createGitlabToSlackMessage(mock.event);
        
                should(result).be.eql(mock.expected);
            });
    
    
            it("canceled", () => {
                const mock = require("./mocks/gitlab/build-canceled-event.gitlab.json");
                const result = createGitlabToSlackMessage(mock.event);
        
                should(result).be.eql(mock.expected);
            });
    
    
            it("returns 'null' on other cases", () => {
                const mock = require("./mocks/gitlab/build-unknown-event.gitlab.json");
                const result = createGitlabToSlackMessage(mock.event);
        
                should(result).be.eql(mock.expected);
            });
        });
    });
});


function createGitlabToSlackMessage(json) {
    return factories.create(consts.TYPES.GITLAB, consts.TYPES.SLACK)
        .createMessageBody(json);
}