"use strict";


const jp = require("jsonpointer");
const _ = require("underscore");
const ParserStrategy = require("./parser-strategy");


class GitlabParserStrategy extends ParserStrategy {
    parse(data) {
        switch (data.object_kind) {
            case "push":
                return this.parsePushEvent(data);
        }
        
        throw new Error(`Unknown 'object_kind', got: ${data.object_kind}`);
    }
    
    
    /**
     * @private
     * @param data
     */
    parsePushEvent(data) {
        const branchName = this.getBranchName(jp.get(data, "/ref"));
        const userName = jp.get(data, "/user_name");
        const projectUrl = jp.get(data, "/project/web_url");
        const projectName = jp.get(data, "/project/name");
        
        const branchUrl = `${projectUrl}/commits/${branchName}`;
        
        const text = `${userName} запушил(а) в ветку <${branchUrl}|${branchName}> проекта <${projectUrl}|${projectName}>`;
        
        const result = {text};
        const commits = this.parseCommits(data);
        if (commits.length > 0) {
            result.attachments = commits;
        }
        return result;
    }
    
    
    /**
     * @private
     * @param data
     * @returns {object[]}
     */
    parseCommits(data) {
        return _.map(jp.get(data, "/commits"), v => {
            const SHA = jp.get(v, "/id");
            const shortSHA = SHA.substr(0, 8);
            const url = jp.get(v, "/url");
            const message = jp.get(v, "/message");
            const authorName = jp.get(v, "/author/name");
            
            return {
                text: `<${url}|${shortSHA}> ${message}`,
                footer: authorName
            };
        });
    }
    
    
    /**
     * @private
     * @param {string} ref
     * @returns {string}
     */
    getBranchName(ref) {
        // todo: assert is string
        let p = (ref || "").split("/");
        return p.length === 0 ? "no_ref" : p[p.length - 1];
    }
}


module.exports = GitlabParserStrategy;