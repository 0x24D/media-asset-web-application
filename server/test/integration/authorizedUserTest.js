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

describe('Authorized user tests', () => {
  const token = '123456';
  beforeEach((done) => {
    const newUser1 = new User({
      username: 'testUser1',
      password: 'testPassword1',
    });
    const newUser2 = new User({
      username: 'testUser2',
      password: 'testPassword2',
      token: token,
    });
    User.insertMany([newUser1, newUser2], () => {
      done();
    });
  });

  afterEach((done) => {
    User.collection.drop();
    done();
  });

  it('should list all users on /api/v1/users GET', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('password');
        res.body[0].username.should.equal('testUser1');
        res.body[0].password.should.equal('testPassword1');
        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('username');
        res.body[1].should.have.property('password');
        res.body[1].username.should.equal('testUser2');
        res.body[1].password.should.equal('testPassword2');
        done();
      });
  });

  it('should add new user on /api/v1/users POST', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .set('Authorization', token)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'testUser3',
        password: 'testPassword3'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.username.should.equal('testUser3');
        res.body.password.should.not.equal('testPassword3');
        done();
      });
  });

  it('should error on /api/v1/users PUT', (done) => {
    chai.request(app)
      .put('/api/v1/users')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should delete all users on /api/v1/users DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/users')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(204);
        // TODO: how to check number of users left?
        done();
      });
  });

  it('should list 1 user on /api/v1/users/<username> GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/testUser1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.username.should.equal('testUser1');
        res.body.password.should.equal('testPassword1');
        done();
      });
  });

  it('should error on /api/v1/users/<username> POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/testUser1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should update 1 user on /api/v1/users/<username> PUT', (done) => {
    chai.request(app)
      .put('/api/v1/users/testUser1')
      .set('Authorization', token)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'testUser1',
        password: 'testPassword1'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.username.should.equal('testUser1');
        res.body.password.should.not.equal('testPassword1');
        done();
      });
  });

  it('should delete 1 user on /api/v1/users/<username> DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/users/testUser1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(204);
        // TODO: how to check number of users left?
        done();
      });
  });
});
