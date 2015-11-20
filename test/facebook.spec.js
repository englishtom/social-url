'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('facebook', function () {
  function testFacebook (url, user) {
    return assertUtil.testNetwork('Facebook', url, user);
  }

  testFacebook('https://www.facebook.com/my_page_id', 'my_page_id');
  testFacebook('https://www.facebook.com/MY_PAGE_ID', 'MY_PAGE_ID');
  testFacebook('http://www.facebook.com/#!/my_page_id', 'my_page_id');
  testFacebook('//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fmy_page_id&amp;', 'my_page_id');
  testFacebook('http://www.facebook.com/pages/foo/Bar-Url/123456?v=app_555', '123456');
  testFacebook('https://www.facebook.com/123456', '123456');
  testFacebook('https://fr.facebook.com/123456', '123456');
  testFacebook('https://gb-en.facebook.com/123456', '123456');
  testFacebook('http://gb-en.facebook.com/123456', '123456');
  testFacebook('www.facebook.com/pages/123456', '123456');
  testFacebook('facebook.com/pages/123456', '123456');

  assertUtil.testNotNetwork('example.com', 'Facebook');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Facebook');
  assertUtil.testNotNetwork('https://www.example.com/facebook/my_page_id', 'Facebook');
  assertUtil.testNotNetwork('http://facebook.example.com/my_page_id', 'Facebook');
});
