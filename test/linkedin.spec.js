'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('linkedin', function () {
  function testLinkedin (url, user, expectedUrl) {
    return assertUtil.testNetwork('Linkedin', url, user, expectedUrl);
  }

  testLinkedin('https://www.linkedin.com/', null);
  testLinkedin('https://linkedin.com/', null);
  testLinkedin('http://www.linkedin.com/', null);
  testLinkedin('linkedin.com/', null);

  testLinkedin('https://www.linkedin.com/in/my-page-id', 'my-page-id');
  testLinkedin('https://linkedin.com/in/my-page-id', 'my-page-id');
  testLinkedin('http://www.linkedin.com/in/my-page-id', 'my-page-id');
  testLinkedin('linkedin.com/in/my-page-id', 'my-page-id', 'https://linkedin.com/in/my-page-id');

  testLinkedin('https://www.linkedin.com/in/my_very_long_page_id_which_should_not_be_valid', null);
  testLinkedin('https://www.linkedin.com/in/my_*invalid*_page_id', null);
  testLinkedin('https://www.linkedin.com/in/@my-page-id', null);
  testLinkedin('https://www.linkedin.com/in/my-page-id/recent-activity/', 'my-page-id');

  assertUtil.testNotNetwork('example.com', 'Linkedin');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Linkedin');
  assertUtil.testNotNetwork('https://www.example.com/linkedin/my-page-id', 'Linkedin');
  assertUtil.testNotNetwork('http://linkedin.example.com/my-page-id', 'Linkedin');
});
