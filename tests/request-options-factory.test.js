"use strict";


const _ = require("underscore");
const should = require("should");
const consts = require("../lib/consts");
const optionFactory = require("../lib/request-options-factory");
const SlackRequestOptionsFactory = require("../lib/request-options-factory/slack.request-options-factory");



describe("request-options-factory", () => {
    it("throws an error because unknown 'type' has been given", () => {
        (() => {
            optionFactory.create(void 0);
        }).should.throw(/Unknown type/);
    });
    
    
    describe("slack.request-options-factory", () => {
        it("creates SlackRequestOptionsFactory", () => {
            const factory = optionFactory.create(consts.TYPES.SLACK);
            should(factory).be.instanceOf(SlackRequestOptionsFactory);
        });
        
        
        describe("return expected options object", () => {
            it("if uri specified", () => {
                const config = { uri: "someuri" };
                const message = { hello: "world" };
                const expected = {
                    method: "post",
                    uri: config.uri,
                    body: message,
                    json:true
                };
                
                const factory = optionFactory.create(consts.TYPES.SLACK, config);
                const options = factory.createOptions(message);
                should(options).be.eql(expected);
            });
            
            
            it("all config properties specified", () => {
                const config = {
                    uri: "someuri",
                    channel: "#some_channel",
                    username: "bot_name"
                };
                const message = { hello: "world" };
                const expected = {
                    method: "post",
                    uri: config.uri,
                    body: _.extend(_.clone(message),{
                        channel: config.channel,
                        username: config.username
                    }),
                    json: true
                };
                
                const factory = optionFactory.create(consts.TYPES.SLACK, config);
                const options = factory.createOptions(message);
                should(options).be.eql(expected);
            });
        });
    });
});