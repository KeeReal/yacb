"use strict";


const should = require("should");
const configValidator = require("../lib/config-validator");


describe("config-validator", () => {
    describe("reports if any prop is invalid", () => {
        it("port", () => {
            const valid = { port: 22 };
            const invalid = { port: "a" };
            
            const re = /'\.port' should be integer/;
            
            should(validate(valid)).not.match(re);
            should(validate(invalid)).match(re);
        });
    
    
        it("host", () => {
            const valid = { host: "0.0.0.0" };
            const invalid  = { host: "a" };
            const re = /'\.host' should match format "ipv4"/;
        
            should(validate(valid)).not.match(re);
            should(validate(invalid)).match(re);
        });
    
    
        it("source/destination type", () => {
            const valid = {
                endpoints: [
                    { source: { type: "gitlab" } }
                ]
            };
            const invalid = {
                endpoints: [
                    { source: { type: "a" } }
                ]
            };
            const re = /'\.endpoints\[0]\.source\.type' should be equal to one of the allowed values/;
        
            should(validate(valid)).not.match(re);
            should(validate(invalid)).match(re);
        });
    
    
        it("path", () => {
            const valid = { endpoints: [ { path: "/hook" }] };
            const invalid = { endpoints: [ { path: 22 }] };
        
            const re = /'\.endpoints\[0]\.path' should be string/;
        
            should(validate(valid)).not.match(re);
            should(validate(invalid)).match(re);
        });
    
    
        it("slack settings", () => {
            const valid = {
                endpoints: [
                    { destination: { settings: {
                        uri: "https://hooks.slack.com/services/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"
                    }}}
                ]
            };
            const invalid = {
                endpoints: [
                    { destination: { settings: {
                        uri: "22"
                    }}}
                ]
            };
            const re = /'\.endpoints\[0]\.destination\.settings\.uri' should match format "uri"/;
        
            should(validate(valid)).not.match(re);
            should(validate(invalid)).match(re);
        });
    });
});


function validate(config) {
    return configValidator.validate(config);
}