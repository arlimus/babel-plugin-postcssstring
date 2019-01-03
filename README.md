# babel-plugin-postcssstring

Transform JS strings via PostCSS.

From:

```js
let css = cssString`
div {
  transform: translateX(0);
}
`
```

Convert to:

```js
let css = "div{~-webkit-transform:translateX(0);transform: translateX(0);}"
```

## Kudos

Largely inspired + code borrowed from:
- https://github.com/kentcdodds/babel-plugin-codegen
- https://github.com/wbyoung/babel-plugin-transform-postcss

