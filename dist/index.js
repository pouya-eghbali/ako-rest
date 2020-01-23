'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var btoa = _interopDefault(require('abab/lib/btoa'));

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
    return this.postOnly
      ? this.fetch(`${this.url}/${method}`, {
          method: "post",
          body,
          headers: this.headers
        })
      : this.fetch(this.url, {
          method,
          body,
          headers: this.headers
        });
  }
  async find(selector = {}, options = {}) {
    const body = { selector, options };
    const request = this.request("get", body);
    const response = await request;
    const result = await response.json();
    if ("error" in result) throw result.error;
    return result;
  }
  async findOne(selector = {}, options = {}) {
    const body = { selector, options: { ...options, limit: 1 } };
    const request = this.request("get", body);
    const response = await request;
    const result = await response.json();
    if ("error" in result) throw result.error;
    return result.pop();
  }
  async insert(document = {}) {
    const body = document;
    const request = this.request("post", body);
    const response = await request;
    const result = await response.json();
    if ("error" in result) throw result.error;
    return result;
  }
  async update(selector = {}, modifier = {}, options = {}) {
    const body = { selector, modifier, options };
    const request = this.request("put", body);
    const response = await request;
    const { result } = await response.json();
    if ("error" in result) throw result.error;
    return result;
  }
  async remove(selector = {}) {
    const body = { selector };
    const request = this.request("delete", body);
    const response = await request;
    const { result } = await response.json();
    if ("error" in result) throw result.error;
    return result;
  }
}

class Client {
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

module.exports = Client;
