import chai from 'chai';
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
import app from '../../app';

import mongoose from 'mongoose';
import { UserSchema } from '../../src/models/userModel';
const User = mongoose.model('user', UserSchema);

chai.use(chaiHttp);

describe('User tests', () => {
    beforeEach((done) => {
        var newUser1 = new User({
            username: 'testUser1',
            password: 'testPassword1'
        });
        var newUser2 = new User({
            username: 'testUser2',
            password: 'testPassword2'
        });
        User.insertMany([newUser1, newUser2], () => {
            done();
        });
    });

    afterEach((done) => {
        User.collection.drop();
        done();
    });

    it('should list all users on /v1/users GET', (done) => {
        chai.request(app)
        .get('/v1/users')
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

    it('should error on /v1/users POST', (done) => {
        chai.request(app)
        .post('/v1/users')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should error on /v1/users PUT', (done) => {
        chai.request(app)
        .put('/v1/users')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should error on /v1/users DELETE', (done) => {
        chai.request(app)
        .del('/v1/users')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should list 1 user on /v1/users/<username> GET', (done) => {
        chai.request(app)
        .get('/v1/users/testUser1')
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

    it('should error on /v1/users/<username>  POST', (done) => {
        chai.request(app)
        .post('/v1/users/testUser1')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should error on /v1/users/<username>  PUT', (done) => {
        chai.request(app)
        .put('/v1/users/testUser1')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should error on /v1/users/<username>  DELETE', (done) => {
        chai.request(app)
        .del('/v1/users/testUser1')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });
});
