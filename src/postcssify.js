import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import process from 'process';

const postcssify = function(css) {
  const ctx = { map: false }
  postcssrc(ctx).then(({ plugins, options }) => {
    options.from = undefined;
    return postcss(plugins)
      .process(css, options)
      .then(res => console.log(res.css))
  })
}

let content = '';
process.stdin.resume();
process.stdin.on('data', buf => content += buf.toString() );
process.stdin.on('end', () => postcssify(content));