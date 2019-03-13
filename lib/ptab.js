"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var Model = base.Model;
var Manager = base.Manager;

var PtabModel =
/*#__PURE__*/
function (_Model) {
  _inherits(PtabModel, _Model);

  function PtabModel() {
    _classCallCheck(this, PtabModel);

    return _possibleConstructorReturn(this, _getPrototypeOf(PtabModel).apply(this, arguments));
  }

  return PtabModel;
}(Model);

;

var PtabManager =
/*#__PURE__*/
function (_Manager) {
  _inherits(PtabManager, _Manager);

  function PtabManager() {
    _classCallCheck(this, PtabManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(PtabManager).apply(this, arguments));
  }

  _createClass(PtabManager, [{
    key: "length",
    value: function () {
      var _length = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var page;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getPage(0);

              case 2:
                page = _context.sent;
                return _context.abrupt("return", page.metadata.count);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function length() {
        return _length.apply(this, arguments);
      }

      return length;
    }()
  }, {
    key: "getPage",
    value: function () {
      var _getPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(pageNumber) {
        var page;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (pageNumber in this.pages) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return request.get({
                  url: "https://ptabdata.uspto.gov/ptab-api/" + this.endpoint,
                  qs: _objectSpread({}, this.params, {
                    offset: pageNumber * 25
                  }),
                  json: true
                });

              case 3:
                page = _context2.sent;
                this.pages[pageNumber] = page;

              case 5:
                return _context2.abrupt("return", this.pages[pageNumber]);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPage(_x) {
        return _getPage.apply(this, arguments);
      }

      return getPage;
    }()
  }, {
    key: "next",
    value: function () {
      var _next2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var pageNumber, index, page;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                pageNumber = Math.floor(this.iteratorIndex / 25);
                index = this.iteratorIndex % 25;
                this.iteratorIndex++;
                _context3.next = 5;
                return this.getPage(pageNumber);

              case 5:
                page = _context3.sent;
                return _context3.abrupt("return", new this.modelClass(page.results[index]));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function next() {
        return _next2.apply(this, arguments);
      }

      return next;
    }()
  }]);

  return PtabManager;
}(Manager);

;

var PtabTrial =
/*#__PURE__*/
function (_PtabModel) {
  _inherits(PtabTrial, _PtabModel);

  function PtabTrial(params) {
    var _this;

    _classCallCheck(this, PtabTrial);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PtabTrial).call(this, params));
    _this.documents = PtabDocument.objects.filter(_this.trialNumber);
    return _this;
  }

  return PtabTrial;
}(PtabModel);

;

var PtabTrialManager =
/*#__PURE__*/
function (_PtabManager) {
  _inherits(PtabTrialManager, _PtabManager);

  function PtabTrialManager() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, PtabTrialManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PtabTrialManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "defaultQuery", "trialNumber");

    _defineProperty(_assertThisInitialized(_this2), "endpoint", "trials");

    _defineProperty(_assertThisInitialized(_this2), "modelClass", PtabTrial);

    return _this2;
  }

  return PtabTrialManager;
}(PtabManager);

var PtabDocument =
/*#__PURE__*/
function (_PtabModel2) {
  _inherits(PtabDocument, _PtabModel2);

  function PtabDocument(params) {
    var _this3;

    _classCallCheck(this, PtabDocument);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(PtabDocument).call(this, params));
    _this3.trial = PtabDocument.objects.filter(_this3.trialNumber);
    return _this3;
  }

  return PtabDocument;
}(PtabModel);

;

var PtabDocumentManager =
/*#__PURE__*/
function (_PtabManager2) {
  _inherits(PtabDocumentManager, _PtabManager2);

  function PtabDocumentManager() {
    var _getPrototypeOf3;

    var _this4;

    _classCallCheck(this, PtabDocumentManager);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(PtabDocumentManager)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this4), "defaultQuery", "trialNumber");

    _defineProperty(_assertThisInitialized(_this4), "endpoint", "documents");

    _defineProperty(_assertThisInitialized(_this4), "modelClass", PtabDocument);

    return _this4;
  }

  return PtabDocumentManager;
}(PtabManager);

PtabTrial.objects = new PtabTrialManager({});
PtabDocument.objects = new PtabDocumentManager({});
module.exports = {
  PtabTrial: PtabTrial,
  PtabDocument: PtabDocument
};
//# sourceMappingURL=ptab.js.map