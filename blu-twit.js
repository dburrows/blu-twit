var Bluebird = require('bluebird');
var Twit = require('twit');

Twit.prototype.getAsync = Bluebird.promisify(Twit.prototype.get);
Twit.prototype.postAsync = Bluebird.promisify(Twit.prototype.post);

module.exports = Twit;
