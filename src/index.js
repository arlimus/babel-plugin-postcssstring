import { declare } from "@babel/helper-plugin-utils";
import { execFileSync } from 'child_process';
import path from 'path';

// Largely inspired by: https://github.com/kentcdodds/babel-plugin-codegen
// and: https://github.com/wbyoung/babel-plugin-transform-postcss
// Lots of code copied from these projects

const nodeExecutable = process.argv[0];
const postcssify = path.join(__dirname, 'postcssify.js');

const cache = {}

function transformCss(css) {
  if(cache[css] != null) return cache[css];

  const execArgs = [postcssify];
  const result = execFileSync(nodeExecutable, execArgs, {
    env: process.env, // eslint-disable-line no-process-env
    input: css,
  }).toString();
  cache[css] = result;
  return result;
}

function transform(quasis) {
  ["raw", "cooked"].forEach((type) => {
    quasis.forEach((element) => {
      element.value[type] = transformCss(element.value[type]);
    });
  });  
}

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-cssstring",

    visitor: {
      TaggedTemplateExpression(path) {
        let node = path.node;
        if(node.tag.name !== 'cssString') return;
        
        transform(node.quasi.quasis)
        path.replaceWith(node.quasi)
      }
    },
  };
});