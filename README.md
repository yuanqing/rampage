# Rampage.js [![npm Version](http://img.shields.io/npm/v/rampage.svg?style=flat)](https://www.npmjs.org/package/rampage) [![Build Status](https://img.shields.io/travis/yuanqing/rampage.svg?style=flat)](https://travis-ci.org/yuanqing/rampage) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/rampage.svg?style=flat)](https://coveralls.io/r/yuanqing/rampage)

> A generic way to split an array into pages, with optional callbacks to modify the structure of each page.

## API

### rampage(arr, numPerPage [, opts])

```js
var arr = [
  { foo: 'bar' },
  { foo: 'baz' },
  { foo: 'qux' }
];

rampage(arr, 2);
/* [
 *   [ arr[0], arr[1] ],
 *   [ arr[2] ]
 * ]
 */
```

Pass in `opts` if you want to create previous/next links or customise the structure of each page:

```js
var opts = {
  preProcess: function(pageItems, pageNum, totalPages) {
    return {
      pageItems: pageItems,
      pageNum: pageNum
    };
  },
  postProcess: function(currPage, prevPage, nextPage, pageNum, totalPages) {
    currPage.prevPage = prevPage;
    currPage.nextPage = nextPage;
    return currPage;
  }
};

var result = rampage(arr, 2, opts);
/* [
 *   {
 *     pageItems: [ arr[0], arr[1] ],
 *     pageNum: 0,
 *     prevPage: undefined,
 *     nextPage: result[1]
 *   },
 *   {
 *     pageItems: [ arr[2] ],
 *     pageNum: 1,
 *     prevPage: result[0],
 *     nextPage: undefined
 *   }
 * ]
 */
```

The `opts.preProcess` function [maps](http://en.wikipedia.org/wiki/Map_(higher-order_function)) over each slice of `arr`. (Each slice would have at most `numPerPage` number of items from `arr`.) This function takes the following arguments:

1. `pageItems` &mdash; A slice of `arr`.
2. `pageNum` &mdash; The current page number. Page numbers start from `0`.
3. `totalPages` &mdash; The total number of pages.

The `opts.postProcess` function maps over the result of `opts.preProcess`. It takes the following arguments:

1. `currPage` &mdash; The current page.
2. `prevPage` &mdash; A reference to the previous page, or `undefined` if there is no previous page.
3. `nextPage` &mdash; A reference to the next page, or `undefined` if there is no next page.
4. `pageNum` &mdash; The current page number. Page numbers start from `0`.
5. `totalPages` &mdash; The total number of pages.

## Installation

Install via [npm](https://www.npmjs.org/):

```bash
$ npm i --save rampage
```

## Changelog

- 0.1.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/rampage/blob/master/LICENSE)
