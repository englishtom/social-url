'use strict';

var urlUtil = require('url');

var GPLUS_LINKS_PATTERN1 = /\/.*(\+[^\/]+)/i;
var GPLUS_LINKS_PATTERN2 = /(?:\/u\/0)?\/([0-9]+)/i;
var TWITTER_LINKS_PATTERN = /\/@?([a-zA-Z0-9_]{1,15})/i;
var FACEBOOK_LINKS_PATTERN = /\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/i;

function parseGooglePlus (url) {
  var match = (
    GPLUS_LINKS_PATTERN1.exec(url.pathname) ||
    GPLUS_LINKS_PATTERN2.exec(url.pathname)
  );

  var user = match && match[1] || null;

  return {
    network: 'Google+',
    user: user
  };
}

function parseTwitter (url) {
  var match = TWITTER_LINKS_PATTERN.exec(url.pathname);
  var user = match && match[1] || null;
  if (user) {
    user = user.toLowerCase();
  }

  return {
    network: 'Twitter',
    user: user
  };
}

function parseFacebook (url) {
  var pathSearchHash = urlUtil.format({
    pathname: url.pathname,
    search: url.search,
    hash: url.hash
  });
  var match = FACEBOOK_LINKS_PATTERN.exec(pathSearchHash);
  var user = match && match[1] || null;

  return {
    network: 'Facebook',
    user: user
  };
}

function parse (url) {
  url = url.replace(/^\/+/, '');
  if (!/^https?:\/\//.test(url)) {
    url = 'https://' + url;
  }

  var parsed = urlUtil.parse(url, true);

  if (parsed.hostname === 'plus.google.com') {
    return parseGooglePlus(parsed);
  } else if (/twitter\.com$/.test(parsed.hostname)) {
    return parseTwitter(parsed);
  } else if (/facebook\.com$/.test(parsed.hostname)) {
    if (/^\/plugins/.test(parsed.pathname) && parsed.query.href) {
      return parseFacebook(urlUtil.parse(parsed.query.href));
    }
    return parseFacebook(parsed);
  }

  return { network: null, user: null };
}

module.exports = {
  parse: parse
};
