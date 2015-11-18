'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('twitter', function () {
  function testTwitter (url, user) {
    return assertUtil.testNetwork('Twitter', url, user);
  }

  testTwitter('https://twitter.com', null);

  testTwitter('https://twitter.com/woorank', 'woorank');
  testTwitter('https://twitter.com/@woorank', 'woorank');
  testTwitter('https://twitter.com/WOORANK', 'woorank');
  testTwitter('https://www.twitter.com/woorank', 'woorank');
  testTwitter('https://www.twitter.com/woorank/lists', 'woorank');
  testTwitter('twitter.com/woorank', 'woorank');
  testTwitter('www.twitter.com/woorank', 'woorank');

  assertUtil.testNotNetwork('https://not-twitter.com/woorank', 'Twitter');
});
