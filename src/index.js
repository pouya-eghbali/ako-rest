import btoa from "abab/lib/btoa";

class Collection {
  constructor({ url, token, postOnly, fetch }) {
    this.url = url;
    this.postOnly = postOnly;
    this.fetch = fetch;
    this.headers = {
      Authorization: `Basic ${token}`
    };
    if (!url.match(/\/api\/direct\//)) {
      const directUrl = url.replace(/\/api\//, "/api/direct/");
      this.direct = new Collection({
        url: directUrl,
        token,
        postOnly,
        fetch
      });
    }
  }
  request(method, body) {
    const request = this.postOnly
      ? this.fetch(`${this.url}/${method}`, {
          method: "POST",
          body,
          headers: this.headers
        })
      : this.fetch(this.url, {
          method,
          body,
          headers: this.headers
        });
    return request
      .then(response => response.json())
      .then(result => {
        if ("error" in result) throw result.error;
        return result;
      });
  }
  find(selector = {}, options = {}) {
    const body = { selector, options };
    return this.request("GET", body);
  }
  findOne(selector = {}, options = {}) {
    const body = { selector, options: { ...options, limit: 1 } };
    return this.request("GET", body);
  }
  insert(document = {}) {
    const body = document;
    return this.request("POST", body);
  }
  update(selector = {}, modifier = {}, options = {}) {
    const body = { selector, modifier, options };
    return this.request("PATCH", body);
  }
  upsert(selector = {}, modifier = {}, options = {}) {
    const body = { selector, modifier, options };
    return this.request("PUT", body);
  }
  remove(selector = {}) {
    const body = { selector };
    return this.request("DELETE", body);
  }
}

export default class Client {
  constructor({ url, username, password, token, postOnly, fetch }) {
    this.url = url;
    this.token = token || btoa(`${username}:${password}`);
    this.postOnly = postOnly;
    this.fetch = fetch;
  }
  collection(name) {
    return new Collection({
      token: this.token,
      url: `${this.url}/${name}`,
      postOnly: this.postOnly,
      fetch: this.fetch
    });
  }
}

/*

const test = async () => {
  const fetch = require("node-fetch");
  const client = new Client({
    url: "http://localhost:3000/api",
    username: "admin",
    password: "admin",
    postOnly: true,
    fetch
  });
  const identities = client.collection("identities");
  const identity = await identities.findOne();
  console.log(identity);
};

test();

*/
