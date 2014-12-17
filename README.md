# blu-twit

A wrapper for the Twit module that uses the Bluebird promise library to add `getAsync` and `postAsync` methods that return promises

## Usage

As the Twit callback returns multiple values we use the Bluebird's `spread` function to make things easier:

```javascript
var BluTwit = require('./blu-twit.js');

var bt = new BluTwit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})

//  tweet 'hello world!'

bt.postAsync('statuses/update', { status: 'hello world!' })
.spread( function(data, res) {
  console.log(data);
  console.log(res.statusCode);
});
```

## API

Same as Twit but the Get and Post methods now have versions that return promises. The full Twit API is still available so streaming etc. will work as normal.

###`getAsync(path, [params])`

Returns a promise instead of using a callback. As Twit returns two params the fulfilled value will be an array of [data, response], see example above of using the `spread` method to simplify your `then` handler.

### `postAsync(paths, [params])`

Same usage as `getAsync`.
