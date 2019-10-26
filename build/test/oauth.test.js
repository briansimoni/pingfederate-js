"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ping_client_1 = require("../src/ping_client");
const client = new ping_client_1.PingClient('https://localhost:9999/pf-admin-api/v1', 'Administrator', 'PassPhrase!1');
async function test() {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    const thing = await client.OAuth.getClient('test');
    console.log(thing);
}
test();
//# sourceMappingURL=oauth.test.js.map