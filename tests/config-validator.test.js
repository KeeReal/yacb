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
    
    
        it("slack options", () => {
            const valid = {
                endpoints: [
                    { destination: { options: {
                        uri: "https://hooks.slack.com/services/aa/dd/aa"
                    }}}
                ]
            };
            const invalid = {
                endpoints: [
                    { destination: { options: {
                        uri: "22"
                    }}}
                ]
            };
            const re = /'\.endpoints\[0]\.destination\.options\.uri' should match format "uri"/;
        
            should(validate(valid)).not.match(re);
            should(validate(invalid)).match(re);
        });
    });
});


function validate(config) {
    return configValidator.validate(config);
}