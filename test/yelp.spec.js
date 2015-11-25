'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('yelp', function () {
  function testYelp (url, user, expectedUrl) {
    return assertUtil.testNetwork('Yelp', url, user, expectedUrl);
  }

  testYelp('http://www.yelp.com/', null);
  testYelp('http://www.yelp.com/bruxelles', null);

  testYelp('https://yelp.com/biz/the-place', 'the-place');
  testYelp('https://www.yelp.com/biz/the-place', 'the-place');
  testYelp('http://yelp.com/biz/the-place', 'the-place');
  testYelp('yelp.com/biz/the-place', 'the-place', 'https://yelp.com/biz/the-place');
  testYelp('www.yelp.com/biz/the-place', 'the-place', 'https://www.yelp.com/biz/the-place');

  assertUtil.testNotNetwork('https://not-yelp.com/biz/', 'Yelp');
});
