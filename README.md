# social-url

Detects and parses user ids out of urls of well known social networks.

[![Circle CI](https://circleci.com/gh/Woorank/social-url.svg?style=svg)](https://circleci.com/gh/Woorank/social-url)

## Example:

```js
var socialUrl = require('social-url');
socialUrl.parse('https://twitter.com/npmjs');
// {
//   network: 'Twitter',
//   user: 'npmjs'
// }
```

## API

`.parse(String url) : Object parseResult`

Parses a possible social url

`url`: the input url

`parseResult`: the parsed output with properties:
  - `String|null network`: the detected network `['Twitter', 'Google+', 'Facebook']`
  - `String|null user`: the detected user
