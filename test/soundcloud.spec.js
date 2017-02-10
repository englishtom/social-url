'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('soundcloud', function () {
  function testSoundcloud (url, user, expectedUrl) {
    return assertUtil.testNetwork('Soundcloud', url, user, expectedUrl);
  }

  testSoundcloud('https://www.soundcloud.com/', null);
  testSoundcloud('https://soundcloud.com/', null);
  testSoundcloud('http://soundcloud.com/', null);
  testSoundcloud('soundcloud.com/', null);

  testSoundcloud('https://www.soundcloud.com/my_page_id', 'my_page_id');
  testSoundcloud('https://soundcloud.com/my_page_id', 'my_page_id');
  testSoundcloud('http://soundcloud.com/my_page_id', 'my_page_id');
  testSoundcloud('soundcloud.com/my_page_id', 'my_page_id', 'https://soundcloud.com/my_page_id');

  testSoundcloud('https://www.soundcloud.com/my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_', null);
  testSoundcloud('https://www.soundcloud.com/my_*invalid*_page_id', null);
  testSoundcloud('https://www.soundcloud.com/@my_page_id', null);
  testSoundcloud('https://www.soundcloud.com/my_page_id/tracks', 'my_page_id');

  assertUtil.testNotNetwork('example.com', 'Soundcloud');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Soundcloud');
  assertUtil.testNotNetwork('https://www.example.com/soundcloud/my_page_id', 'Soundcloud');
  assertUtil.testNotNetwork('http://soundcloud.example.com/my_page_id', 'Soundcloud');
});
