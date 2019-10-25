"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
class PingClient {
    constructor(baseURL, username, password, basicCreds) {
        this.baseURL = baseURL;
        if (basicCreds) {
            this.credentials = basicCreds;
        }
        else {
            const buff = Buffer.from(`${username}:${password}`);
            this.credentials = buff.toString('base64');
        }
    }
    makeRequest(verb, path, body) {
        fetch('asdf', {});
    }
}
exports.PingClient = PingClient;
//# sourceMappingURL=ping_client.js.map