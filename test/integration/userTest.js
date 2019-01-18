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
        console.log('beforeEach called');
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
        console.log('afterEach called');
        User.collection.drop();
        done();
    });

    it('should list all users on /user GET', (done) => {
        chai.request(app)
        .get('/user')
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
    it('should list 1 user on /user/<username> GET', (done) => {
        chai.request(app)
        .get('/user/testUser1')
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
});
