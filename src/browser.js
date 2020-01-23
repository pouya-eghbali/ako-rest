import restClient from "./index";

export default class Client extends restClient {
  constructor({ url, username, password, token, postOnly, fetch }) {
    super({
      url,
      username,
      password,
      token,
      postOnly,
      fetch: fetch || window.fetch
    });
  }
}
