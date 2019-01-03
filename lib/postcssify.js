"use strict";

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssLoadConfig = _interopRequireDefault(require("postcss-load-config"));

var _process = _interopRequireDefault(require("process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postcssify = function postcssify(css) {
  var ctx = {
    map: false
  };
  (0, _postcssLoadConfig.default)(ctx).then(function (_ref) {
    var plugins = _ref.plugins,
        options = _ref.options;
    options.from = undefined;
    return (0, _postcss.default)(plugins).process(css, options).then(function (res) {
      return console.log(res.css);
    });
  });
};

var content = '';

_process.default.stdin.resume();

_process.default.stdin.on('data', function (buf) {
  return content += buf.toString();
});

_process.default.stdin.on('end', function () {
  return postcssify(content);
});