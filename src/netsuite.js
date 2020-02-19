import restClient from "./index";

const suite = {};

export class Client extends restClient {
  constructor({ url, username, password, token, fetch, postOnly = true }) {
    super({
      url,
      username,
      password,
      token,
      postOnly,
      fetch: fetch || suite.fetch
    });
  }
}

export function withHTTPS(https) {
  suite.fetch = (url, { method, body, headers }) => {
    const response = https.request({
      url,
      method,
      headers,
      body
    });
    return {
      then(fn) {
        const result = fn({
          json() {
            return JSON.parse(response.body);
          }
        });
        return {
          then(fn) {
            return fn(result);
          }
        };
      }
    };
  };
}
