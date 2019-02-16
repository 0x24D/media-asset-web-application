import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import mongoose from 'mongoose';
import app from '../../app';
import bcrypt from 'bcryptjs';

import { UserSchema } from '../../src/models/userModel';

const chaiHttp = require('chai-http');

const should = chai.should();

const User = mongoose.model('user', UserSchema);

const SALT_WORK_FACTOR = 10;

chai.use(chaiHttp);

describe('Authentication tests', () => {
  const token = '123456';
  beforeEach((done) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      bcrypt.hash('testPassword1', salt, (err2, hash) => {
        const newUser = new User({ username: 'testUser1', password: hash, salt, token });
        newUser.save();
        done();
      });
    });
  });
  afterEach((done) => {
    User.collection.drop();
    done();
  });

  it('should get a token on /api/v1/authentication/login POST with valid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'testUser1',
        password: 'testPassword1',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.token.should.not.be.null;
        done();
      });
  });

  it('should error on /api/v1/authentication/login POST with invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'testUser1',
        password: 'testPassword2',
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
    });
  });

  it('should delete our token on /api/v1/authentication/logout POST with a token', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/logout')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('should error on /api/v1/authentication/logout POST with an invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/logout')
      .set('Authorization', 'thisIsAnInvalidToken')
      .end((err, res) => {
        res.should.have.status(401);
        done();
    });
  });

  it('should error on /api/v1/authentication/logout POST with no token', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/logout')
      .end((err, res) => {
        res.should.have.status(401);
        done();
    });
  });

});
