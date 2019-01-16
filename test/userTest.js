import chai from 'chai';
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
import app from '../app';

chai.use(chaiHttp);

describe('GET /user', () => {
  it('Respond with no data', (done) => {
    chai.request(app)
        .get('/user')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.be.eql([]);
            done();
        });
    });
});
