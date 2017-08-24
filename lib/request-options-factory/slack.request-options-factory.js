"use strict";


const RequestOptionsFactory = require("./request-options-factory");


/**
 * @typedef {object} ISlackOptionFactoryConfig
 * @property {string} [channel]
 * @property {string} [username]
 * @property {string} [uri]
 */


class SlackRequestOptionsFactory extends RequestOptionsFactory {
    
    /**
     * @param {ISlackOptionFactoryConfig} config
     */
    constructor(config) {
        super();

        /**
         * @private
         * @type {ISlackOptionFactoryConfig}
         */
        this.config = config;
    }
    
    
    createOptions(message) {
        if (this.config.channel) {
            message.channel = this.config.channel;
        }
        
        if (this.config.username) {
            message.username = this.config.username;
        }
        
        return {
            method: "post",
            uri: this.config.uri,
            body: message,
            json: true
        };
    }
}


module.exports = SlackRequestOptionsFactory;