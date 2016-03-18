'use strict';

/* globals it, describe */

var socialUrl = require('..');
var assert = require('assert');

describe('socialUrl', function () {
  it('doesn\'t fail on null input', () => {
    assert.strictEqual(socialUrl.parse(null).network, null);
  });

  it('doesn\'t fail on undefined input', () => {
    assert.strictEqual(socialUrl.parse().network, null);
  });

  it('doesn\'t fail on non string input', () => {
    assert.strictEqual(socialUrl.parse({}).network, null);
  });
});
