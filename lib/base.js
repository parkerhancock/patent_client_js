"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume("next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

require("@babel/polyfill");

var Model = function Model(data) {
  _classCallCheck(this, Model);

  var _arr = Object.keys(data);

  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];
    this[key] = key.includes("Date") ? new Date(data[key]) : data[key];
  }
};

var _Symbol$asyncIterator = Symbol.asyncIterator;

var Manager =
/*#__PURE__*/
function () {
  function Manager(params) {
    _classCallCheck(this, Manager);

    _defineProperty(this, _Symbol$asyncIterator, _wrapAsyncGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var length, i, pageNumber, position, page, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _awaitAsyncGenerator(this.length());

            case 2:
              length = _context.sent;
              i = 0;

            case 4:
              if (!(i < length)) {
                _context.next = 17;
                break;
              }

              pageNumber = Math.floor(i / 20);
              position = i % 20;
              _context.next = 9;
              return _awaitAsyncGenerator(this.getPage(pageNumber));

            case 9:
              page = _context.sent;
              data = null;

              if (this.docLocation) {
                data = this.docLocation.split(".").reduce(function (agg, next) {
                  return agg[next];
                }, page);
              } else {
                data = page;
              }

              _context.next = 14;
              return new this.modelClass(data[position]);

            case 14:
              i++;
              _context.next = 4;
              break;

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    this.params = this.applyDefaultQuery(params);
    this.pages = {};
    this.docLocation = "results";
  }

  _createClass(Manager, [{
    key: "applyDefaultQuery",
    value: function applyDefaultQuery(params) {
      if (typeof params === 'string' || params instanceof String) {
        params = _defineProperty({}, this.defaultQuery, params);
      }

      return params;
    }
  }, {
    key: "filter",
    value: function filter(params) {
      return new this.constructor(_objectSpread({}, this.params, this.applyDefaultQuery(params)));
    }
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(params) {
        var manager, length;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                manager = this.filter(params);
                length = manager.length();

                if (!(length > 1)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error("More than one object found!");

              case 6:
                if (!(length == 0)) {
                  _context2.next = 8;
                  break;
                }

                throw new Error("No objects found!");

              case 8:
                return _context2.abrupt("return", manager.first());

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "first",
    value: function () {
      var _first = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var item;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this[Symbol.asyncIterator]().next();

              case 2:
                item = _context3.sent;
                return _context3.abrupt("return", item.value);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function first() {
        return _first.apply(this, arguments);
      }

      return first;
    }()
  }, {
    key: "getPage",
    value: function () {
      var _getPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(pageNumber) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (pageNumber in this.pages) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 3;
                return this.fetchPage(pageNumber);

              case 3:
                this.pages[pageNumber] = _context4.sent;

              case 4:
                return _context4.abrupt("return", this.pages[pageNumber]);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPage(_x2) {
        return _getPage.apply(this, arguments);
      }

      return getPage;
    }()
  }]);

  return Manager;
}();

;
module.exports = {
  Model: Model,
  Manager: Manager
};
//# sourceMappingURL=base.js.map