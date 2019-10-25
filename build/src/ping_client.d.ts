export declare class PingClient {
    baseURL: string;
    credentials: string;
    constructor(baseURL: string, username?: string, password?: string, basicCreds?: string);
    makeRequest(verb: string, path: string, body: {}): void;
}
