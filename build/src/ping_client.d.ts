import { OAuthClientService } from './oauth';
export declare class PingClient {
    baseURL: string;
    credentials: string;
    timeout: number;
    oAuth: OAuthClientService;
    constructor(baseURL: string, username?: string, password?: string, basicCreds?: string, timeout?: number);
    makeRequest(verb: string, path: string, body?: {} | undefined): Promise<any>;
}
export declare class PingFederateError extends Error {
    message: string;
    reasons: Object;
    statusCode?: number;
    constructor(message: string, reasons: Object, statusCode?: number);
}
