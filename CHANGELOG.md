# Changelog

## Version 7.1.1

Regenerate `package-lock.json`.

## Version 7.1.0

### Dependency updates

* `htmlparser2` updated from 6.0.0 to 6.1.0 ([Release notes](https://github.com/fb55/htmlparser2/releases));
* dev dependencies are bumped.

## Version 7.0.0

### Node version

Required Node version is now >=10.23.2.

### Dependency updates

* `lodash` dependency is removed;
* `htmlparser2` updated from 4.1.0 to 6.0.0 ([Release notes](https://github.com/fb55/htmlparser2/releases), also [domhandler](https://github.com/fb55/domhandler/releases/tag/v4.0.0)). There is a slim chance you can run into some differences in case you're relying on it heavily in your custom formatters;
* dev dependencies are bumped.

### Custom formatters API change

[BlockTextBuilder](https://github.com/html-to-text/node-html-to-text/blob/master/lib/block-text-builder.js) methods now accept option objects for optional arguments. This improves client code readability and allows to introduce extra options with ease. It will see some use in future updates.

Positional arguments introduced in version 6.0.0 are now deprecated. Formatters written for the version 6.0.0 should keep working for now but the compatibility layer is rather inconvenient and will be removed with the next major version.

See the commit [f50f10f](https://github.com/html-to-text/node-html-to-text/commit/f50f10f54cf814efb2f7633d9d377ba7eadeaf1e). Changes in `lib/formatter.js` file are illustrative for how to migrate to the new API.

### And more

* Bunch of documentation and test updates.

All commits: [6.0.0...7.0.0](https://github.com/html-to-text/node-html-to-text/compare/6.0.0...7.0.0)

Version 7 roadmap issue: [#222](https://github.com/html-to-text/node-html-to-text/issues/222)

## Version 6.0.0

This is a major update. No code left untouched. While the goal was to keep as much compatibility as possible, some client-facing changes were unavoidable.

### fromString() is deprecated in favor of htmlToText()

Since the library has the only exported function, it is now self-titled.

### Inline and block-level tags, HTML whitespace

Formatting code was rewritten almost entirely to make it aware of block-level tags and to handle HTML whitespace properly. One of popular requests was to support divs, and it is here now, after a lot of effort.

### Options reorganized

Options are reorganized to make room for some extra format options while making everything more structured. Now tag-specific options live within that tag configuration.

For the majority of changed options there is a compatibility layer that will remain until next major release. But you are encouraged to explore new options since they provide a bit more flexibility.

### Custom formatters are different now

Because formatters are integral part of the formatting code (as the name suggests), it wasn't possible to provide a compatibility layer.

Please refer to the Readme to see how things are wired now, in case you were using them for anything othen than dealing with the lack of block-level tags support.

### Tables support was improved

Cells can make use of extra space with colspan and rowspan attributes. Max column width is defined separately from global wordwrap limit.

### Limits

Multiple options to cut content in large HTML documents.

By default, any input longer than 16 million characters will be truncated.

### Node and dependencies

Required Node version is now >=8.10.0.

Dependency versions are bumped.

### Repository is moved to it's own organization

[https://github.com/html-to-text/node-html-to-text](https://github.com/html-to-text/node-html-to-text) is the new home.

GitHub should handle all redirects from the old url, so it shouldn't break anything, even if you have a local fork pointing at the old origin. But it is still a good idea to [update](https://docs.github.com/en/free-pro-team@latest/github/using-git/changing-a-remotes-url) the url.

### And more

Version 6 roadmap issue: [#200](https://github.com/html-to-text/node-html-to-text/issues/200)

## Version 5.1.1

* `preserveNewLines` whitespace issue fixed [#162](https://github.com/html-to-text/node-html-to-text/pull/162)

## Version 5.1.0

* Hard-coded CLI options removed [#173](https://github.com/html-to-text/node-html-to-text/pull/173)

## Version 5.0.0

### BREAKING CHANGES

#### fromFile removed

The function `fromFile` is removed. It was the main reason `html-to-text` could not be used in the browser [#164](https://github.com/html-to-text/node-html-to-text/pull/164).

You can get the `fromFile` functionality back by using the following code

```js
const fs = require('fs');
const { fromString } = require('html-to-text');

// Callback version
const fromFile = (file, options, callback) => {
  if (!callback) {
    callback = options;
    options = {};
  }
  fs.readFile(file, 'utf8', (err, str) => {
    if (err) return callback(err);
    callback(null, fromString(str, options));
  });
};

// Promise version
const fromFile = (file, option) => fs.promises.readFile(file, 'utf8').then(html => fromString(html, options));

// Sync version
const fromFileSync = (file, options) => fromString(fs.readFileSync(file, 'utf8'), options);
```

#### Supported NodeJS Versions

Node versions < 6 are no longer supported.

## Version 4.0.0

* Support dropped for node version < 4.
* New option `unorderedListItemPrefix` added.
* HTML entities in links are not supported.

## Version 3.3.0

* Ability to pass custom formatting via the `format` option #128
* Enhanced support for alpha ordered list types added #123

## Version 3.2.0

* Basic support for alpha ordered list types added #122
  * This includes support for the `ol` type values `1`, `a` and `A`

## Version 3.1.0

* Support for the ordered list start attribute added #117
* Option to format paragraph with single new line #112
* `noLinksBrackets` options added #119

## Version 3.0.0

* Switched from `htmlparser` to `htmlparser2` #113
* Treat non-numeric colspans as zero and handle them gracefully #105

## Version 2.1.1

* Extra space ploblem fixed. #88

## Version 2.1.0

* New option to disable `uppercaseHeadings` added. #86
* Starting point of html to text conversion can now be defined in the options via the `baseElement` option. #83
* Support for long words added. The behaviour can be configured via the `longWordSplit` option. #83

## Version 2.0.0

* Unicode support added. #81
* New option `decodeOptions` added.
* Dependencies updated.

Breaking Changes:

* Minimum node version increased to >=0.10.0

## Version 1.6.2

* Fixed: correctly handle HTML entities for images #82

## Version 1.6.1

* Fixed: using --tables=true doesn't produce the expected results. #80

## Version 1.6.0

* Preserve newlines in text feature added #75

## Version 1.5.1

* Support for h5 and h6 tags added #74

## Version 1.5.0

* Entity regex is now less greedy #69 #70

## Version 1.4.0

* Uppercase tag processing added. Table center support added. #56
* Unuused dependencies removed.

## Version 1.3.2

* Support Node 4 engine #64
