"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const oauth_1 = require("./oauth");
class PingClient {
    constructor(baseURL, username, password, basicCreds, timeout) {
        this.timeout = 10000;
        if (typeof timeout === 'number' && timeout > 0) {
            this.timeout = timeout;
        }
        this.baseURL = baseURL;
        if (basicCreds) {
            this.credentials = basicCreds;
        }
        else {
            const buff = Buffer.from(`${username}:${password}`);
            this.credentials = buff.toString('base64');
        }
        this.oAuth = new oauth_1.OAuthClientService(this);
    }
    async makeRequest(verb, path, body) {
        const url = `${this.baseURL}${path}`;
        const options = {
            method: verb,
            headers: {
                'Content-Type': 'application/json',
                'X-Xsrf-Header': 'PingFederate',
                Authorization: `Basic ${this.credentials}`,
            },
            timeout: this.timeout,
            body: JSON.stringify(body)
        };
        const response = await fetch(url, options);
        if (response.status < 200 || response.status >= 400) {
            let json;
            try {
                json = await response.json();
            }
            catch (error) {
                throw new Error(`${response.status} ${response.statusText} ${path}. Problem parsing error response from PingFederate ${error.message}`);
            }
            throw new PingFederateError(json.message, json, response.status);
        }
        if (verb === 'DELETE') {
            return null;
        }
        return response.json();
    }
}
exports.PingClient = PingClient;
class PingFederateError extends Error {
    constructor(message, reasons, statusCode) {
        super();
        this.message = message;
        this.reasons = reasons;
        this.statusCode = statusCode;
    }
}
exports.PingFederateError = PingFederateError;
//# sourceMappingURL=ping_client.js.map