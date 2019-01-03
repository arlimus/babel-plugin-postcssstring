"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Largely inspired by: https://github.com/kentcdodds/babel-plugin-codegen
// and: https://github.com/wbyoung/babel-plugin-transform-postcss
// Lots of code copied from these projects
var nodeExecutable = process.argv[0];

var postcssify = _path.default.join(__dirname, 'postcssify.js');

var cache = {};

function transformCss(css) {
  if (cache[css] != null) return cache[css];
  var execArgs = [postcssify];
  var result = (0, _child_process.execFileSync)(nodeExecutable, execArgs, {
    env: process.env,
    // eslint-disable-line no-process-env
    input: css
  }).toString();
  cache[css] = result;
  return result;
}

function transform(quasis) {
  ["raw", "cooked"].forEach(function (type) {
    quasis.forEach(function (element) {
      element.value[type] = transformCss(element.value[type]);
    });
  });
}

var _default = (0, _helperPluginUtils.declare)(function (api) {
  api.assertVersion(7);
  return {
    name: "transform-cssstring",
    visitor: {
      TaggedTemplateExpression: function TaggedTemplateExpression(path) {
        var node = path.node;
        if (node.tag.name !== 'cssString') return;
        transform(node.quasi.quasis);
        path.replaceWith(node.quasi);
      }
    }
  };
});

exports.default = _default;