import { PingClient } from './ping_client';

export interface OAuthClient {
  clientId: string;
  enabled?: boolean;
  redirectUris?: string[];
  grantTypes: string[];
  name: string;
  description?: string;
  logoUrl?: string;
  defaultAccessTokenManagerRef?: DefaultAccessTokenManagerRef;
  validateUsingAllEligibleAtms?: boolean;
  refreshRolling?: string;
  persistentGrantExpirationType?: string;
  persistentGrantExpirationTime?: string;
  persistentGrantExpirationTimeUnit?: string;
  persistentGrantIdleTimeoutType?: string;
  persistentGrantIdleTimeout?: string;
  persistentGrantIdleTimeoutTimeUnit?: string;
  bypassApprovalPage?: boolean;
  restrictScopes?: boolean;
  restrictedScopes?: string[];
  exclusiveScopes?: string[];
  restrictedResponseTypes?: string[];
  requireSignedRequests?: boolean;
  requestObjectSigningAlgorithm?: string;
  oidcPolicy?: OidcPolicy;
  clientAuth?: ClientAuth;
  jwksSettings?: JwksSettings;
  extendedParameters?: ExtendedParameters;
  deviceFlowSettingType?: string;
  userAuthorizationUrlOverride?: string;
  pendingAuthorizationTimeoutOverride?: string;
  devicePollingIntervalOverride?: string;
  bypassActivationCodeConfirmationOverride?: boolean;
}

export interface ClientAuth {
  type?: string;
  secret?: string;
  encryptedSecret?: string;
  clientCertIssuerDn?: string;
  clientCertSubjectDn?: string;
  enforceReplayPrevention?: boolean;
  tokenEndpointAuthSigningAlgorithm?: string;
}

export interface DefaultAccessTokenManagerRef {
  id?: string;
  location?: string;
}

export interface ExtendedParameters {
  key?: Key;
}

export interface Key {
  values?: string[];
}

export interface JwksSettings {
  jwksUrl?: string;
  jwks?: string;
}

export interface OidcPolicy {
  idTokenSigningAlgorithm?: string;
  idTokenEncryptionAlgorithm?: string;
  idTokenContentEncryptionAlgorithm?: string;
  policyGroup?: DefaultAccessTokenManagerRef;
  grantAccessSessionRevocationApi?: boolean;
  pingAccessLogoutCapable?: boolean;
  logoutUris?: string[];
}

export interface ClientSecret {
  secret?: string;
  encryptedSecret?: string;
}

export class OAuthClientService {
  private pingClient: PingClient

  constructor(pingClient: PingClient) {
    this.pingClient = pingClient;
  }

  async getClient(clientId: string) {
    let client: OAuthClient;
    client = await this.pingClient.makeRequest('GET', `/oauth/clients/${clientId}`);
    return client;
  }

  async createClient(client: OAuthClient) {
    client = await this.pingClient.makeRequest('POST', `/oauth/clients/`, client);
    return client;
  }

  async deleteClient(clientId: string) {
    await this.pingClient.makeRequest('DELETE', `/oauth/clients/${clientId}`);
  }

  async updateClient(client: OAuthClient) {
    let updatedClient: OAuthClient;
    updatedClient = await this.pingClient.makeRequest('PUT', `/oauth/clients/${client.clientId}`, client);
    return updatedClient;
  }

  async getClientSecret(clientId: string) {
    let clientSecret: ClientSecret
    clientSecret = await this.pingClient.makeRequest('GET', `/oauth/clients/${clientId}/clientAuth/clientSecret`);
    return clientSecret;
  }

  async updateClientSecret(clientId: string, secret: ClientSecret) {
    secret = await this.pingClient.makeRequest('PUT', `/oauth/clients/${clientId}/clientAuth/clientSecret`, secret);
    return secret;
  }
}
