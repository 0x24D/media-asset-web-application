import chai from 'chai'
var expect = chai.expect
var request = require("supertest");
import app from '../app';

describe('GET /contact', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/contact')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
