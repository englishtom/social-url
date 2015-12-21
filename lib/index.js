'use strict';

var urlUtil = require('url');

var GPLUS_LINKS_PATTERN1 = /\/.*(\+[^\/]+)/i;
var GPLUS_LINKS_PATTERN2 = /(?:\/u\/\d+)?\/([0-9]+)/i;
var TWITTER_LINKS_PATTERN = /\/@?([a-zA-Z0-9_]{1,15})/i;
var YELP_LINKS_PATTERN = /^\/biz\/([^/]+)/i;
var FOURSQUARE_LINKS_PATTERN = /^\/v\/([^/]+)(?:\/([^/]+))?/i;

function parseGooglePlus (url) {
  var match = (
    GPLUS_LINKS_PATTERN1.exec(url.pathname) ||
    GPLUS_LINKS_PATTERN2.exec(url.pathname)
  );

  var user = match && match[1] || null;

  return {
    network: 'Google+',
    user: user,
    url: url.href
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
    user: user,
    url: url.href
  };
}

function parseFacebook (url) {
  var path = url.pathname;

  if (url.pathname === '/' && url.hash) {
    path = url.hash.replace(/^#!/, '');
  }

  var parts = path.split('/').filter(function (x) { return x; });
  var user = null;
  var part = null;

  while (parts.length > 0) {
    part = parts.pop();
    var match = /(\d+)$/.exec(part);
    if (match) {
      user = match[1];
      break;
    }
  }

  if (!user) {
    user = part;
  }

  return {
    network: 'Facebook',
    user: user,
    url: url.href
  };
}

function parseYelp (url) {
  var match = YELP_LINKS_PATTERN.exec(url.pathname);
  var user = match && match[1] || null;

  return {
    network: 'Yelp',
    user: user,
    url: url.href
  };
}

function parseFoursquare (url) {
  var match = FOURSQUARE_LINKS_PATTERN.exec(url.pathname);
  var user = match && (match[2] || match[1]) || null;

  return {
    network: 'Foursquare',
    user: user,
    url: url.href
  };
}

function parse (url) {
  url = url.replace(/^\/+/, '');
  if (!/^https?:\/\//.test(url)) {
    url = 'https://' + url;
  }

  var parsed = urlUtil.parse(url, true);
  var hostname = parsed.hostname;
  var domain = hostname.split('.').slice(-2).join('.');

  if (hostname === 'plus.google.com') {
    return parseGooglePlus(parsed);
  } else if (domain === 'twitter.com') {
    return parseTwitter(parsed);
  } else if (domain === 'facebook.com') {
    if (/^\/plugins/.test(parsed.pathname) && parsed.query.href) {
      return parseFacebook(urlUtil.parse(parsed.query.href));
    }
    return parseFacebook(parsed);
  } else if (domain === 'yelp.com') {
    return parseYelp(parsed);
  } else if (domain === 'foursquare.com') {
    return parseFoursquare(parsed);
  }

  return { network: null, user: null, url: parsed.href };
}

module.exports = {
  parse: parse
};
