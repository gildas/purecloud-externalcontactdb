'use strict';
var test    = require('tape');
var request = require('supertest');
var app     = require('../app.js');

test('should get an agent for a valid id', function(assert) {
  var input    = { ContactId: '1111' };
  var expected = 'agent01';

  request(app)
    .post('/GetAccountByContactId')
    .send(input)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      assert.plan(2);
      assert.ifError(err, 'No error');
      assert.equal(res.body.Account.CustomAttribute, expected, "CustomAttribute does not contain the proper value");
    });
});

test('should get a 404 error for a invalid id', function(assert) {
  var input    = { ContactId: '9999' };

  request(app)
    .post('/GetAccountByContactId')
    .send(input)
    .expect(404)
    .expect('Content-Type', /text/)
    .end(function(err, res){
      assert.plan(1);
      assert.equal(res.text, "error.id.notfound(id: \"9999\")");
    });
});

test('should get a 400 error for a missing id', function(assert) {
  var input    = { };

  request(app)
    .post('/GetAccountByContactId')
    .send(input)
    .expect(400)
    .expect('Content-Type', /text/)
    .end(function(err, res){
      assert.plan(1);
      assert.equal(res.text, "error.key.notfound(id: \"ContactId\")");
    });
});

test.onFinish(function(){
  app.get('server').close();
});
