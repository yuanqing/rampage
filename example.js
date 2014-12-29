/* jshint unused: false */
'use strict';

var rampage = require('./');

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
