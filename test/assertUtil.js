'use tsrict';

/* globals it */

var socialUrl = require('..');
var assert = require('assert');

function testNotNetwork (network, url) {
  it('shouldn\'t categorize "' + url + '" as "' + network + '"', function () {
    var parsed = socialUrl.parse(url);
    assert.notStrictEqual(parsed.network, network);
  });
}

function testNetwork (network, url, user) {
  if (user) {
    it('should find "' + user + '" in "' + url + '"', function () {
      var parsed = socialUrl.parse(url);
      assert.strictEqual(parsed.network, network);
      assert.strictEqual(parsed.user, user);
    });
  } else {
    it('shouldn\'t find a user in "' + url + '"', function () {
      var parsed = socialUrl.parse(url);
      assert.strictEqual(parsed.network, network);
      assert(!parsed.user);
    });
  }
}

module.exports = {
  testNetwork: testNetwork,
  testNotNetwork: testNotNetwork
};
