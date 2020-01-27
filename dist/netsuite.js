define(['exports'], function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof_1(Symbol.iterator) === "symbol") {
        module.exports = _typeof = function _typeof(obj) {
          return _typeof_1(obj);
        };
      } else {
        module.exports = _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof_1(obj);
        };
      }

      return _typeof(obj);
    }

    module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
    function _getPrototypeOf(o) {
      module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  /**
   * btoa() as defined by the HTML and Infra specs, which mostly just references
   * RFC 4648.
   */

  function btoa(s) {
    var i; // String conversion as required by Web IDL.

    s = "".concat(s); // "The btoa() method must throw an "InvalidCharacterError" DOMException if
    // data contains any character whose code point is greater than U+00FF."

    for (i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) > 255) {
        return null;
      }
    }

    var out = "";

    for (i = 0; i < s.length; i += 3) {
      var groupsOfSix = [undefined, undefined, undefined, undefined];
      groupsOfSix[0] = s.charCodeAt(i) >> 2;
      groupsOfSix[1] = (s.charCodeAt(i) & 0x03) << 4;

      if (s.length > i + 1) {
        groupsOfSix[1] |= s.charCodeAt(i + 1) >> 4;
        groupsOfSix[2] = (s.charCodeAt(i + 1) & 0x0f) << 2;
      }

      if (s.length > i + 2) {
        groupsOfSix[2] |= s.charCodeAt(i + 2) >> 6;
        groupsOfSix[3] = s.charCodeAt(i + 2) & 0x3f;
      }

      for (var j = 0; j < groupsOfSix.length; j++) {
        if (typeof groupsOfSix[j] === "undefined") {
          out += "=";
        } else {
          out += btoaLookup(groupsOfSix[j]);
        }
      }
    }

    return out;
  }
  /**
   * Lookup table for btoa(), which converts a six-bit number into the
   * corresponding ASCII character.
   */


  function btoaLookup(idx) {
    if (idx < 26) {
      return String.fromCharCode(idx + "A".charCodeAt(0));
    }

    if (idx < 52) {
      return String.fromCharCode(idx - 26 + "a".charCodeAt(0));
    }

    if (idx < 62) {
      return String.fromCharCode(idx - 52 + "0".charCodeAt(0));
    }

    if (idx === 62) {
      return "+";
    }

    if (idx === 63) {
      return "/";
    } // Throw INVALID_CHARACTER_ERR exception here -- won't be hit in the tests.


    return undefined;
  }

  var btoa_1 = btoa;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var Collection =
  /*#__PURE__*/
  function () {
    function Collection(_ref) {
      var url = _ref.url,
          token = _ref.token,
          postOnly = _ref.postOnly,
          fetch = _ref.fetch;

      classCallCheck(this, Collection);

      this.url = url;
      this.postOnly = postOnly;
      this.fetch = fetch;
      this.headers = {
        Authorization: "Basic ".concat(token)
      };

      if (!url.match(/\/api\/direct\//)) {
        var directUrl = url.replace(/\/api\//, "/api/direct/");
        this.direct = new Collection({
          url: directUrl,
          token: token,
          postOnly: postOnly,
          fetch: fetch
        });
      }
    }

    createClass(Collection, [{
      key: "request",
      value: function request(method, body) {
        var request = this.postOnly ? this.fetch("".concat(this.url, "/").concat(method), {
          method: "POST",
          body: body,
          headers: this.headers
        }) : this.fetch(this.url, {
          method: method,
          body: body,
          headers: this.headers
        });
        return request.then(function (response) {
          return response.json();
        }).then(function (result) {
          if ("error" in result) throw result.error;
          return result;
        });
      }
    }, {
      key: "find",
      value: function find() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var body = {
          selector: selector,
          options: options
        };
        return this.request("GET", body);
      }
    }, {
      key: "findOne",
      value: function findOne() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var body = {
          selector: selector,
          options: _objectSpread({}, options, {
            limit: 1
          })
        };
        return this.request("GET", body);
      }
    }, {
      key: "insert",
      value: function insert() {
        var document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var body = document;
        return this.request("POST", body);
      }
    }, {
      key: "update",
      value: function update() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var body = {
          selector: selector,
          modifier: modifier,
          options: options
        };
        return this.request("PUT", body);
      }
    }, {
      key: "remove",
      value: function remove() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var body = {
          selector: selector
        };
        return this.request("DELETE", body);
      }
    }]);

    return Collection;
  }();

  var Client =
  /*#__PURE__*/
  function () {
    function Client(_ref2) {
      var url = _ref2.url,
          username = _ref2.username,
          password = _ref2.password,
          token = _ref2.token,
          postOnly = _ref2.postOnly,
          fetch = _ref2.fetch;

      classCallCheck(this, Client);

      this.url = url;
      this.token = token || btoa_1("".concat(username, ":").concat(password));
      this.postOnly = postOnly;
      this.fetch = fetch;
    }

    createClass(Client, [{
      key: "collection",
      value: function collection(name) {
        return new Collection({
          token: this.token,
          url: "".concat(this.url, "/").concat(name),
          postOnly: this.postOnly,
          fetch: this.fetch
        });
      }
    }]);

    return Client;
  }();

  var suite = {};
  var Client$1 =
  /*#__PURE__*/
  function (_restClient) {
    inherits(Client, _restClient);

    function Client(_ref) {
      var url = _ref.url,
          username = _ref.username,
          password = _ref.password,
          token = _ref.token,
          fetch = _ref.fetch,
          _ref$postOnly = _ref.postOnly,
          postOnly = _ref$postOnly === void 0 ? true : _ref$postOnly;

      classCallCheck(this, Client);

      return possibleConstructorReturn(this, getPrototypeOf(Client).call(this, {
        url: url,
        username: username,
        password: password,
        token: token,
        postOnly: postOnly,
        fetch: fetch || suite.fetch
      }));
    }

    return Client;
  }(Client);
  function withHTTPS(https) {
    suite.fetch = function (url, _ref2) {
      var method = _ref2.method,
          body = _ref2.body,
          headers = _ref2.headers;
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
      var response = https.request({
        url: url,
        method: method,
        headers: headers,
        body: body
      });
      return {
        then: function then(fn) {
          var result = fn({
            json: function json() {
              return JSON.parse(response.body);
            }
          });
          return {
            then: function then(fn) {
              return fn(result);
            }
          };
        }
      };
    };
  }

  exports.Client = Client$1;
  exports.withHTTPS = withHTTPS;

  Object.defineProperty(exports, '__esModule', { value: true });

});
