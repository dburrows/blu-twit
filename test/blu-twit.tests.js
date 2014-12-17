var BluTwit = require('../blu-twit.js');
var nock = require('nock');
var chai = require('chai');
var expect = chai.expect;

// setup mock http requests
var twitterPOST = nock('https://api.twitter.com')
                  .post('/1.1/statuses/update.json')
                  .times(2)
                  .reply(200, {
                    test: 'foo'
                  })
                  ;

var twitterGET = nock('https://api.twitter.com')
                .get('/1.1/statuses/user_timeline.json?status=hello%20world!')
                .times(2)
                .reply(200, {
                  test: 'bar'
                 })
                ;

describe('BluTwit', function(){
  var bt;

  beforeEach(function() {

    bt = new BluTwit({
        consumer_key: '01234',
        consumer_secret: '01234',
        access_token: '01234',
        access_token_secret: '01234'
    });

  });

  describe('.postAsync()', function(){

    it('should return promise', function() {
      return bt.postAsync('statuses/update', { status: 'hello world!' })
      .then( function(result) {
        expect(result[1].statusCode).to.equal(200);
        expect(result[0]).to.deep.equal({ 'test': 'foo'});
      });
    });

    it('should return a promise that works with spread', function() {
      return bt.postAsync('statuses/update', { status: 'hello world!' })
      .spread( function(data, res) {
        expect(res.statusCode).to.equal(200);
        expect(data).to.deep.equal({ 'test': 'foo'});
      });
    });

  });

  describe('.getAsync()', function(){

    it('should return promise', function() {
      return bt.getAsync('statuses/user_timeline', { status: 'hello world!' })
      .then( function(result) {
        expect(result[1].statusCode).to.equal(200);
        expect(result[0]).to.deep.equal({ 'test': 'bar'});
      });
    });

    it('should return promise that works with spread', function() {
      return bt.getAsync('statuses/user_timeline', { status: 'hello world!' })
      .spread( function(data, res) {
        expect(res.statusCode).to.equal(200);
        expect(data).to.deep.equal({ 'test': 'bar'});
      });
    });
  });

});
