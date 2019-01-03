import { declare } from "@babel/helper-plugin-utils";
import { execFileSync } from 'child_process';
import path from 'path';

// Largely inspired by: https://github.com/kentcdodds/babel-plugin-codegen
// and: https://github.com/wbyoung/babel-plugin-transform-postcss
// Lots of code copied from these projects

const nodeExecutable = process.argv[0];
const postcssify = path.join(__dirname, 'postcssify.js');

function transform(quasis) {
  ["raw", "cooked"].forEach((type) => {
    quasis.forEach((element) => {
      const css = element.value[type];
      const execArgs = [postcssify];
      const result = execFileSync(nodeExecutable, execArgs, {
        env: process.env, // eslint-disable-line no-process-env
        input: css,
      }).toString();
      element.value[type] = result;
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