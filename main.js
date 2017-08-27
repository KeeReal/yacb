"use strict";


const config = loadConfig();
validateConfig(config);


const _ = require("underscore");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const messageFactories = require("./lib/message-factories");
const requestOptionsFactories = require("./lib/request-options-factory");


const app = express();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

_.each(config.endpoints, endpoint => {
    const sType = endpoint.source.type;
    const dType = endpoint.destination.type;
    const dOpts = endpoint.destination.options;
    
    console.log(`${endpoint.path} : ${sType} -> ${dType}`);
    
    const messageFactory = messageFactories.create(sType, dType);
    const requestOptionsFactory = requestOptionsFactories.create(dType, dOpts);
    
    app.post(endpoint.path, (req, res) => {
        const body = req.body;
        const messageBody = messageFactory.createMessageBody(body);
        if (messageBody) {
            const options = requestOptionsFactory.createOptions(messageBody);
            request(options);
        }
        res.sendStatus(200);
    });
});


const PORT = config.port;
const HOST = config.host;
app.listen(PORT, HOST, () => console.log(`${HOST}:${PORT}`));


function loadConfig() {
    const argv = process.argv;
    const path = require("path");
    const fs = require("fs");
    
    let pathToConfig = null;
    
    if (argv.length.length >= 2) {
        pathToConfig = path.join(__dirname, "" + argv[2]);
    } else {
        pathToConfig = path.join(__dirname, "default.config.json");
    }
    
    console.log(`use ${pathToConfig} as config`);
    return require(pathToConfig);
}


function validateConfig(config) {
    const configValidator = require("./lib/config-validator");
    const result = configValidator.validate(config);
    if (result !== null) {
        console.error(result.split(",").join(require("os").EOL));
        process.exit();
    }
}