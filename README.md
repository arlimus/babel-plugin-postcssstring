# babel-plugin-postcssstring

**tl;dr: use PostCSS to process strings in javascript files**

From:

```js
let css = cssString`
div {
  transform: translateX(0);
}
`
```

To:

```js
let css = "div{~-webkit-transform:translateX(0);transform: translateX(0);}"
```


**Why?**

Sometimes you want your CSS in a template or string in javascript. This is particularly useful for web components. However it has been difficult to make this CSS backwards-compatible, small, and use advanced features. Not anymore. PostCSS has it all, this plugin makes it accessible to your strings.


**Why PostCSS?**

Because it is an incredibly powerful plugin-based library to mangle all your CSS needs, from minification, prefixing, and providing future CSS syntax.


## Installation

Install from Github for now, until it is published:

```
yarn add https://github.com/arlimus/babel-plugin-postcssstring
```

Then add it to your babel plugins.


## Kudos

Largely inspired + code borrowed from:
- https://github.com/kentcdodds/babel-plugin-codegen
- https://github.com/wbyoung/babel-plugin-transform-postcss

Kudos to PostCSS, all contributors, plugin-writers, and maintainers
- https://postcss.org/
