"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var USApplication =
/*#__PURE__*/
function (_base$Model) {
  _inherits(USApplication, _base$Model);

  function USApplication() {
    _classCallCheck(this, USApplication);

    return _possibleConstructorReturn(this, _getPrototypeOf(USApplication).apply(this, arguments));
  }

  return USApplication;
}(base.Model);

;

var USApplicationManager =
/*#__PURE__*/
function (_base$Manager) {
  _inherits(USApplicationManager, _base$Manager);

  function USApplicationManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, USApplicationManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(USApplicationManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "modelClass", USApplication);

    _defineProperty(_assertThisInitialized(_this), "defaultQuery", "applId");

    _defineProperty(_assertThisInitialized(_this), "docLocation", "response.docs");

    return _this;
  }

  _createClass(USApplicationManager, [{
    key: "fetchPage",
    value: function () {
      var _fetchPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(pageNumber) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return request.post({
                  url: "https://ped.uspto.gov/api/queries",
                  body: this.getQuery(pageNumber),
                  json: true
                });

              case 2:
                response = _context.sent;
                return _context.abrupt("return", response.queryResults.searchResponse);

              case 4:
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
                return _context2.abrupt("return", page.response.numFound);

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
  }, {
    key: "getQuery",
    value: function getQuery(pageNumber) {
      var query = {
        qf: "appEarlyPubNumber applId appLocation appType appStatus_txt appConfrNumber appCustNumber appGrpArtNumber appCls appSubCls appEntityStatus_txt patentNumber patentTitle primaryInventor firstNamedApplicant appExamName appExamPrefrdName appAttrDockNumber appPCTNumber appIntlPubNumber wipoEarlyPubNumber pctAppType firstInventorFile appClsSubCls rankAndInventorsList",
        facet: "false",
        sort: "applId asc",
        start: pageNumber * 20
      };

      function reducer(accumulator, param) {
        var _param = _slicedToArray(param, 2),
            field = _param[0],
            query = _param[1];

        if (field == "limit") {
          return accumulator;
        } else {
          return accumulator + "".concat(field, ":(").concat(query, ") ");
        }
      }

      query.searchText = Object.entries(this.params).reduce(reducer, "");
      return query;
    }
  }]);

  return USApplicationManager;
}(base.Manager);

;
USApplication.objects = new USApplicationManager({});
module.exports = {
  USApplication: USApplication
};
//# sourceMappingURL=peds.js.map