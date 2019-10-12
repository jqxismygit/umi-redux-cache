"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCachedAction = exports.effect = exports.middleware = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CACHE_SINGLE = Symbol('$$cache-proxy$$');
var cache = {};

var middleware = function middleware(store) {
  return function (next) {
    return function (action) {
      if (action && action[CACHE_SINGLE]) {
        cache[action[CACHE_SINGLE]] = true;
      }

      next(action);
    };
  };
};

exports.middleware = middleware;

var effect = function effect(_effect, _ref, model, actionType) {
  var put = _ref.put;
  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _len,
          args,
          _key,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              if (!(args && args.length > 0 && !cache[JSON.stringify(args[0])])) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return _effect.apply(void 0, args);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
};

exports.effect = effect;

var createCachedAction = function createCachedAction(proxyAction, currentAction) {
  if (proxyAction) {
    var single = JSON.stringify(proxyAction);
    return _objectSpread({}, currentAction, _defineProperty({}, CACHE_SINGLE, single));
  } else {
    return currentAction;
  }
};

exports.createCachedAction = createCachedAction;