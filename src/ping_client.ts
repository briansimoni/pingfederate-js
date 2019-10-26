import * as fetch from 'isomorphic-fetch';
import { OAuthClientService } from './oauth';
import { METHODS } from 'http';

export class PingClient {
  baseURL: string;
  credentials: string;
  timeout = 10000
  oAuth: OAuthClientService

  constructor(
    baseURL: string,
    username?: string,
    password?: string,
    basicCreds?: string,
    timeout?: number
  ) {
    if (typeof timeout === 'number' && timeout > 0) {
      this.timeout = timeout;
    }
    this.baseURL = baseURL;
    if (basicCreds) {
      this.credentials = basicCreds;
    } else {
      const buff = Buffer.from(`${username}:${password}`);
      this.credentials = buff.toString('base64');
    }
    this.oAuth = new OAuthClientService(this);
  }

  async makeRequest(verb: string, path: string, body?: {} | undefined) {
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
    }

    const response = await fetch(url, options);
    if (response.status < 200 || response.status >= 400) {
      let json;
      try {
        json = await response.json();
      } catch (error) {
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


export class PingFederateError extends Error {
  message: string
  reasons: Object
  statusCode?: number
  constructor(message: string, reasons: Object, statusCode?: number) {
    super();
    this.message = message;
    this.reasons = reasons;
    this.statusCode = statusCode;
  }
}
