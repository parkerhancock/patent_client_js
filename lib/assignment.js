"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

require("@babel/polyfill");

var request = require('request-promise-native');

var base = require('./base');

var Assignment =
/*#__PURE__*/
function (_base$Model) {
  _inherits(Assignment, _base$Model);

  function Assignment() {
    _classCallCheck(this, Assignment);

    return _possibleConstructorReturn(this, _getPrototypeOf(Assignment).apply(this, arguments));
  }

  return Assignment;
}(base.Model);

;

var AssignmentManager =
/*#__PURE__*/
function (_base$Manager) {
  _inherits(AssignmentManager, _base$Manager);

  function AssignmentManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AssignmentManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AssignmentManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "defaultQuery", "applicationNumber");

    _defineProperty(_assertThisInitialized(_this), "docLocation", "docs");

    _defineProperty(_assertThisInitialized(_this), "modelClass", Assignment);

    _defineProperty(_assertThisInitialized(_this), "objectFromXml", function (xml_str) {
      var parser = new DOMParser();
      var xml_obj = parser.parseFromString(xml_str, "application/xml");
      var docs = Array.from(xml_obj.getElementsByTagName("doc")).map(_this.parseDoc);
      var length = parseInt(xml_obj.getElementsByTagName("result")[0].getAttribute("numFound"), 10);
      return {
        length: length,
        docs: docs
      };
    });

    _defineProperty(_assertThisInitialized(_this), "parseDoc", function (doc) {
      return Array.from(doc.childNodes.values()).reduce(function (obj, node) {
        obj[node.getAttribute("name")] = _this.parseChild(node);
        return obj;
      }, {});
    });

    _defineProperty(_assertThisInitialized(_this), "parseChild", function (node) {
      switch (node.nodeName) {
        case "arr":
          return Array.from(node.childNodes.values()).map(function (node) {
            return _this.parseChild(node);
          });

        case "date":
          return new Date(node.textContent);

        default:
          return node.textContent;
      }
    });

    return _this;
  }

  _createClass(AssignmentManager, [{
    key: "fetchPage",
    value: function () {
      var _fetchPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(pageNumber) {
        var response, page;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return request.get({
                  url: "https://assignment-api.uspto.gov/patent/advancedSearch",
                  qs: _objectSpread({}, {
                    start: pageNumber * 20,
                    rows: 20,
                    facet: false
                  }, this.params),
                  strictSSL: false
                });

              case 2:
                response = _context.sent;
                page = this.objectFromXml(response);
                return _context.abrupt("return", page);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchPage(_x) {
        return _fetchPage.apply(this, arguments);
      }

      return fetchPage;
    }()
  }, {
    key: "length",
    value: function () {
      var _length = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var page;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.params.limit) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this.params.limit);

              case 2:
                _context2.next = 4;
                return this.getPage(0);

              case 4:
                page = _context2.sent;
                return _context2.abrupt("return", page.length);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function length() {
        return _length.apply(this, arguments);
      }

      return length;
    }()
  }]);

  return AssignmentManager;
}(base.Manager);

;
Assignment.objects = new AssignmentManager({});
module.exports = {
  Assignment: Assignment
};
//# sourceMappingURL=assignment.js.map