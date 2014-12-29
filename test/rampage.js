'use strict';

var tape = require('tape');
var rampage = require('..');

tape('check arguments', function(t) {

  t.throws(function() {
    rampage({});
  }, 'need array');

  t.throws(function() {
    rampage(['foo'], 0);
  }, 'need positive integer');

  t.end();

});

tape('no `opts`', function(t) {

  var arr = [
    { foo: 'bar' },
    { foo: 'baz' },
    { foo: 'qux' }
  ];

  var pages = rampage(arr, 2);

  t.equals(pages.length, 2);

  t.looseEquals(pages[0], [
    { foo: 'bar' },
    { foo: 'baz' }
  ]);
  t.equals(pages[0][0], arr[0]);
  t.equals(pages[0][1], arr[1]);

  t.looseEquals(pages[1], [
    { foo: 'qux' }
  ]);
  t.equals(pages[1][0], arr[2]);

  t.end();

});

tape('with `opts`', function(t) {

  var arr = [
    { foo: 'bar' },
    { foo: 'baz' },
    { foo: 'qux' }
  ];

  var opts = {
    preProcess: function(pageItems, pageNum, totalPages) {
      return {
        pre: {
          pageItems: pageItems,
          pageNum: pageNum,
          totalPages: totalPages
        }
      };
    },
    postProcess: function(currPage, prevPage, nextPage, pageNum, totalPages) {
      currPage.post = {
        prevPage: prevPage,
        nextPage: nextPage,
        pageNum: pageNum,
        totalPages: totalPages
      };
      return currPage;
    }
  };

  var pages = rampage(arr, 2, opts);

  t.equals(pages.length, 2);

  t.looseEquals(pages[0].pre.pageItems, [
    { foo: 'bar' },
    { foo: 'baz' }
  ]);
  t.equals(pages[0].pre.pageItems[0], arr[0]);
  t.equals(pages[0].pre.pageItems[1], arr[1]);
  t.equals(pages[0].pre.pageNum, 0);
  t.equals(pages[0].pre.totalPages, 2);
  t.equals(pages[0].post.prevPage, undefined);
  t.equals(pages[0].post.nextPage, pages[1]);
  t.equals(pages[0].post.pageNum, 0);
  t.equals(pages[0].post.totalPages, 2);

  t.looseEquals(pages[1].pre.pageItems, [
    { foo: 'qux' }
  ]);
  t.equals(pages[1].pre.pageItems[0], arr[2]);
  t.equals(pages[1].pre.pageNum, 1);
  t.equals(pages[1].pre.totalPages, 2);
  t.equals(pages[1].post.prevPage, pages[0]);
  t.equals(pages[1].post.nextPage, undefined);
  t.equals(pages[1].post.pageNum, 1);
  t.equals(pages[1].post.totalPages, 2);

  t.end();

});
