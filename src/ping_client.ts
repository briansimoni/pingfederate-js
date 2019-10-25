import * as fetch from 'isomorphic-fetch';

export class PingClient {
  baseURL: string;
  credentials: string;

  constructor(
    baseURL: string,
    username?: string,
    password?: string,
    basicCreds?: string
  ) {
    this.baseURL = baseURL;
    if (basicCreds) {
      this.credentials = basicCreds;
    } else {
      const buff = Buffer.from(`${username}:${password}`);
      this.credentials = buff.toString('base64');
    }
  }

  makeRequest(verb: string, path: string, body: {}) {
    fetch('asdf', {});
  }
}
