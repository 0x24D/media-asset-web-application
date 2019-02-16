import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import mongoose from 'mongoose';
import app from '../../app';

import { UserSchema } from '../../src/models/userModel';

const chaiHttp = require('chai-http');

const should = chai.should();

const User = mongoose.model('user', UserSchema);

chai.use(chaiHttp);

describe('Unauthorized user tests', () => {
  it('should error on /api/v1/users GET', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/users POST', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/users PUT', (done) => {
    chai.request(app)
      .put('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/users DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/users/<username> GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/testUser1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/users/<username> POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/testUser1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/users/<username> PUT', (done) => {
    chai.request(app)
      .put('/api/v1/users/testUser1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/users/<username> DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/users/testUser1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
