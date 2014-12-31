'use strict';

var identity = function(o) {
  return o;
};

var rampage = function(arr, numPerPage, opts) {

  // check arguments
  if (numPerPage < 1) {
    throw new Error('numPerPage must be a positive integer');
  }

  // unwrap `opts`
  opts = opts || {};
  var preProcess = opts.preProcess || identity;
  var postProcess = opts.postProcess;

  // populate `pages` by slicing `arr`
  var pages = [];
  var numPages = Math.ceil(arr.length / numPerPage);
  var i = -1;
  while (++i < numPages) {
    // apply `preProcess` over each slice of `arr`
    pages.push(preProcess(arr.slice(i * numPerPage, (i + 1) * numPerPage), i, numPages));
  }

  if (typeof postProcess === 'function') {
    i = -1;
    while (++i < numPages) {
      // apply `postProcess` over each page in `pages`
      pages[i] = postProcess(pages[i], pages[i-1], pages[i+1], i, numPages);
    }
  }

  return pages;

};

module.exports = rampage;
