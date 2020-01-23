define(function () { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /**
   * btoa() as defined by the HTML and Infra specs, which mostly just references
   * RFC 4648.
   */

  function btoa(s) {
    let i; // String conversion as required by Web IDL.

    s = `${s}`; // "The btoa() method must throw an "InvalidCharacterError" DOMException if
    // data contains any character whose code point is greater than U+00FF."

    for (i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) > 255) {
        return null;
      }
    }

    let out = "";

    for (i = 0; i < s.length; i += 3) {
      const groupsOfSix = [undefined, undefined, undefined, undefined];
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

      for (let j = 0; j < groupsOfSix.length; j++) {
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

  var Collection =
  /*#__PURE__*/
  function () {
    function Collection(_ref) {
      var url = _ref.url,
          token = _ref.token,
          postOnly = _ref.postOnly,
          fetch = _ref.fetch;

      _classCallCheck(this, Collection);

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

    _createClass(Collection, [{
      key: "request",
      value: function request(method, body) {
        return this.postOnly ? this.fetch("".concat(this.url, "/").concat(method), {
          method: "post",
          body: body,
          headers: this.headers
        }) : this.fetch(this.url, {
          method: method,
          body: body,
          headers: this.headers
        });
      }
    }, {
      key: "find",
      value: function () {
        var _find = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var selector,
              options,
              body,
              request,
              response,
              result,
              _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  selector = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                  body = {
                    selector: selector,
                    options: options
                  };
                  request = this.request("get", body);
                  _context.next = 6;
                  return request;

                case 6:
                  response = _context.sent;
                  _context.next = 9;
                  return response.json();

                case 9:
                  result = _context.sent;

                  if (!("error" in result)) {
                    _context.next = 12;
                    break;
                  }

                  throw result.error;

                case 12:
                  return _context.abrupt("return", result);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function find() {
          return _find.apply(this, arguments);
        }

        return find;
      }()
    }, {
      key: "findOne",
      value: function () {
        var _findOne = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var selector,
              options,
              body,
              request,
              response,
              result,
              _args2 = arguments;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  selector = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                  options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                  body = {
                    selector: selector,
                    options: _objectSpread2({}, options, {
                      limit: 1
                    })
                  };
                  request = this.request("get", body);
                  _context2.next = 6;
                  return request;

                case 6:
                  response = _context2.sent;
                  _context2.next = 9;
                  return response.json();

                case 9:
                  result = _context2.sent;

                  if (!("error" in result)) {
                    _context2.next = 12;
                    break;
                  }

                  throw result.error;

                case 12:
                  return _context2.abrupt("return", result.pop());

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function findOne() {
          return _findOne.apply(this, arguments);
        }

        return findOne;
      }()
    }, {
      key: "insert",
      value: function () {
        var _insert = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          var document,
              body,
              request,
              response,
              result,
              _args3 = arguments;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  document = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                  body = document;
                  request = this.request("post", body);
                  _context3.next = 5;
                  return request;

                case 5:
                  response = _context3.sent;
                  _context3.next = 8;
                  return response.json();

                case 8:
                  result = _context3.sent;

                  if (!("error" in result)) {
                    _context3.next = 11;
                    break;
                  }

                  throw result.error;

                case 11:
                  return _context3.abrupt("return", result);

                case 12:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function insert() {
          return _insert.apply(this, arguments);
        }

        return insert;
      }()
    }, {
      key: "update",
      value: function () {
        var _update = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4() {
          var selector,
              modifier,
              options,
              body,
              request,
              response,
              _ref2,
              result,
              _args4 = arguments;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  selector = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                  modifier = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                  options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                  body = {
                    selector: selector,
                    modifier: modifier,
                    options: options
                  };
                  request = this.request("put", body);
                  _context4.next = 7;
                  return request;

                case 7:
                  response = _context4.sent;
                  _context4.next = 10;
                  return response.json();

                case 10:
                  _ref2 = _context4.sent;
                  result = _ref2.result;

                  if (!("error" in result)) {
                    _context4.next = 14;
                    break;
                  }

                  throw result.error;

                case 14:
                  return _context4.abrupt("return", result);

                case 15:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function update() {
          return _update.apply(this, arguments);
        }

        return update;
      }()
    }, {
      key: "remove",
      value: function () {
        var _remove = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5() {
          var selector,
              body,
              request,
              response,
              _ref3,
              result,
              _args5 = arguments;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  selector = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                  body = {
                    selector: selector
                  };
                  request = this.request("delete", body);
                  _context5.next = 5;
                  return request;

                case 5:
                  response = _context5.sent;
                  _context5.next = 8;
                  return response.json();

                case 8:
                  _ref3 = _context5.sent;
                  result = _ref3.result;

                  if (!("error" in result)) {
                    _context5.next = 12;
                    break;
                  }

                  throw result.error;

                case 12:
                  return _context5.abrupt("return", result);

                case 13:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function remove() {
          return _remove.apply(this, arguments);
        }

        return remove;
      }()
    }]);

    return Collection;
  }();

  var Client =
  /*#__PURE__*/
  function () {
    function Client(_ref4) {
      var url = _ref4.url,
          username = _ref4.username,
          password = _ref4.password,
          token = _ref4.token,
          postOnly = _ref4.postOnly,
          fetch = _ref4.fetch;

      _classCallCheck(this, Client);

      this.url = url;
      this.token = token || btoa_1("".concat(username, ":").concat(password));
      this.postOnly = postOnly;
      this.fetch = fetch;
    }

    _createClass(Client, [{
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
  define(["N/https"], function (https) {
    suite.fetch = function (url, _ref) {
      var method = _ref.method,
          body = _ref.body,
          headers = _ref.headers;
      return https.request.promise({
        url: url,
        method: method,
        headers: headers,
        body: body
      });
    };
  });

  var Client$1 =
  /*#__PURE__*/
  function (_restClient) {
    _inherits(Client, _restClient);

    function Client(_ref2) {
      var url = _ref2.url,
          username = _ref2.username,
          password = _ref2.password,
          token = _ref2.token,
          fetch = _ref2.fetch,
          _ref2$postOnly = _ref2.postOnly,
          postOnly = _ref2$postOnly === void 0 ? true : _ref2$postOnly;

      _classCallCheck(this, Client);

      return _possibleConstructorReturn(this, _getPrototypeOf(Client).call(this, {
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

  return Client$1;

});
