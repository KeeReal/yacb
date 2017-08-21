"use strict";


const jp = require("jsonpointer");
const _ = require("underscore");
const ParserStrategy = require("./parser-strategy");


class GitlabParserStrategy extends ParserStrategy {
    parse(data) {
        switch (data.object_kind) {
            case "push": return this.parsePushEvent(data);
            case "build": return this.parseBuildEvent(data);
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
    
    
    /**
     * @private
     * @param data
     */
    parseBuildEvent(data) {
        const EXPECTED_STATUSES = ["running", "success", "failed"];
        const buildStatus = jp.get(data, "/build_status");
        if (EXPECTED_STATUSES.indexOf(buildStatus) === -1) {
            return null;
        }
    
        const projectUrl = jp.get(data, "/repository/homepage");
        const projectName = jp.get(data, "/repository/name");
        const commitSHA = jp.get(data, "/sha");
        const commitShortSHA = commitSHA.substr(0, 8);
        const commitUrl = `${projectUrl}/commit/${commitSHA}`;
    
        const buildId = jp.get(data, "/build_id");
        const buildName = jp.get(data, "/build_name");
        const buildUrl = `${projectUrl}/builds/${buildId}`;
        
        const result = {};
        let stateText = "";
        
        switch (buildStatus) {
            
            case "running":
                stateText = "выполняется";
                result.color = "#eeeeee";
                break;
                
            case "success":
                stateText = "успех";
                result.color = "#5cb85c";
                result.footer = `длительность ${Math.ceil(jp.get(data, "/build_duration"))} с`;
                break;
    
    
            case "failed":
                stateText = "ошибка";
                result.color = "#d9534f";
                result.footer = `длительность ${Math.ceil(jp.get(data, "/build_duration"))} с`;
                break;
                
        }
    
    
        result.text = [
            `<${projectUrl}|${projectName}>`,
            " : ",
            `<${commitUrl}|${commitShortSHA}>`,
            ` : ${stateText} `,
            `<${buildUrl}|${buildName} #${buildId}>`
        ].join("");
        
        return { attachments: [ result ] };
    }
}


module.exports = GitlabParserStrategy;