import restClient from "./index";

const suite = {};

define(["N/https"], function(https) {
  suite.fetch = (url, { method, body, headers }) =>
    https.request.promise({
      url,
      method,
      headers,
      body
    });
});

export default class Client extends restClient {
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
