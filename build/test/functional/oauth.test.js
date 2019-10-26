"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ping_client_1 = require("../../src/ping_client");
const client = new ping_client_1.PingClient('https://localhost:9999/pf-admin-api/v1', 'Administrator', 'PassPhrase!1');
async function test() {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    const thing = await client.oAuth.getClient('test');
    console.log(thing.clientId);
    const newClient = {
        clientId: 'test2',
        name: 'test2',
        grantTypes: ['AUTHORIZATION_CODE'],
        redirectUris: ['http://localhost:9000']
    };
    try {
        const thing2 = await client.oAuth.createClient(newClient);
        console.log(thing2.clientId);
    }
    catch (error) {
        console.log(error.reasons.validationErrors);
    }
    try {
        if (typeof newClient.redirectUris !== 'undefined') {
            newClient.redirectUris.push('http://asdf.com');
            const thing2 = await client.oAuth.updateClient(newClient);
            console.log(thing2.redirectUris);
        }
    }
    catch (error) {
        console.log(error.reasons.validationErrors);
    }
    try {
        await client.oAuth.deleteClient('test2');
    }
    catch (error) {
        console.log(error);
    }
    try {
        const s1 = await client.oAuth.getClientSecret('test');
        console.log(s1);
        const s = await client.oAuth.updateClientSecret('test', {
            secret: 'sickpasswordbro'
        });
        console.log('updated secret', s);
    }
    catch (error) {
        console.log(error);
    }
}
test();
//# sourceMappingURL=oauth.test.js.map