"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OAuthClientService {
    constructor(pingClient) {
        this.pingClient = pingClient;
    }
    async getClient(clientId) {
        let client;
        client = await this.pingClient.makeRequest('GET', `/oauth/clients/${clientId}`);
        return client;
    }
    async createClient(client) {
        client = await this.pingClient.makeRequest('POST', `/oauth/clients/`, client);
        return client;
    }
    async deleteClient(clientId) {
        await this.pingClient.makeRequest('DELETE', `/oauth/clients/${clientId}`);
    }
    async updateClient(client) {
        let updatedClient;
        updatedClient = await this.pingClient.makeRequest('PUT', `/oauth/clients/${client.clientId}`, client);
        return updatedClient;
    }
    async getClientSecret(clientId) {
        let clientSecret;
        clientSecret = await this.pingClient.makeRequest('GET', `/oauth/clients/${clientId}/clientAuth/clientSecret`);
        return clientSecret;
    }
    async updateClientSecret(clientId, secret) {
        secret = await this.pingClient.makeRequest('PUT', `/oauth/clients/${clientId}/clientAuth/clientSecret`, secret);
        return secret;
    }
}
exports.OAuthClientService = OAuthClientService;
//# sourceMappingURL=oauth.js.map