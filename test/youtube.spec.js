'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('youtube', function () {
  function testYoutube (url, user, expectedUrl) {
    return assertUtil.testNetwork('Youtube', url, user, expectedUrl);
  }

  testYoutube('https://www.youtube.com/', null);
  testYoutube('https://youtube.com/', null);
  testYoutube('http://youtube.com/', null);
  testYoutube('youtube.com/', null);

  testYoutube('https://www.youtube.com/my_page_id', 'my_page_id');
  testYoutube('https://youtube.com/my_page_id', 'my_page_id');
  testYoutube('http://youtube.com/my_page_id', 'my_page_id');
  testYoutube('youtube.com/my_page_id', 'my_page_id', 'https://youtube.com/my_page_id');

  testYoutube('https://www.youtube.com/c/my_page_id', 'my_page_id');
  testYoutube('https://youtube.com/c/my_page_id', 'my_page_id');
  testYoutube('http://youtube.com/c/my_page_id', 'my_page_id');
  testYoutube('youtube.com/c/my_page_id', 'my_page_id', 'https://youtube.com/c/my_page_id');

  testYoutube('https://www.youtube.com/channel/my_page_id', 'my_page_id');
  testYoutube('https://youtube.com/channel/my_page_id', 'my_page_id');
  testYoutube('http://youtube.com/channel/my_page_id', 'my_page_id');
  testYoutube('youtube.com/channel/my_page_id', 'my_page_id', 'https://youtube.com/channel/my_page_id');

  testYoutube('https://www.youtube.com/user/my_page_id', 'my_page_id');
  testYoutube('https://youtube.com/user/my_page_id', 'my_page_id');
  testYoutube('http://youtube.com/user/my_page_id', 'my_page_id');
  testYoutube('youtube.com/user/my_page_id', 'my_page_id', 'https://youtube.com/user/my_page_id');

  testYoutube('https://www.youtube.com/user/my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid', null);
  testYoutube('https://www.youtube.com/user/my_*invalid*_page_id', null);
  testYoutube('https://www.youtube.com/user/@my_page_id', null);
  testYoutube('https://www.youtube.com/user/my_page_id/videos', 'my_page_id');

  assertUtil.testNotNetwork('example.com', 'Youtube');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Youtube');
  assertUtil.testNotNetwork('https://www.example.com/youtube/my_page_id', 'Youtube');
  assertUtil.testNotNetwork('http://youtube.example.com/my_page_id', 'Youtube');
});
