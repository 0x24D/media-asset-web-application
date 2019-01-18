import chai from 'chai';
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
import app from '../../app';

import mongoose from 'mongoose';
import { FileSchema } from '../../src/models/fileModel';
const File = mongoose.model('file', FileSchema);

chai.use(chaiHttp);

describe('File tests', () => {
    beforeEach((done) => {
        var newFile1 = new File({
            name: 'testFile1.txt',
            data: [{
                title: 'This is the first test file',
                author: 'test user',
                tags: ['test', 'txt']
            }]
        });
        var newFile2 = new File({
            name: 'testFile2.pdf',
            data: [{
                title: 'This is the second test file',
                author: 'test user',
                tags: ['test', 'pdf']
            }]
        });
        File.insertMany([newFile1, newFile2], () => {
            done();
        });
    });

    afterEach((done) => {
        File.collection.drop();
        done();
    });

    it('should list all files on /file GET', (done) => {
        chai.request(app)
        .get('/file')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            expect(res.body).to.have.lengthOf(2);

            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('data');
            res.body[0].name.should.equal('testFile1.txt');
            res.body[0].data.should.be.a('array');
            expect(res.body[0].data).to.have.lengthOf(1);
            res.body[0].data[0].should.be.a('object');
            res.body[0].data[0].should.have.property('_id');
            res.body[0].data[0].should.have.property('version');
            res.body[0].data[0].should.have.property('title');
            res.body[0].data[0].should.have.property('author');
            res.body[0].data[0].should.have.property('created_date');
            res.body[0].data[0].should.have.property('tags');
            res.body[0].data[0].version.should.equal(1);
            res.body[0].data[0].title.should.equal('This is the first test file');
            res.body[0].data[0].author.should.equal('test user');
            res.body[0].data[0].tags.should.be.a('array');
            expect(res.body[0].data[0].tags).to.have.lengthOf(2);
            res.body[0].data[0].tags[0].should.equal('test');
            res.body[0].data[0].tags[1].should.equal('txt');

            res.body[1].should.have.property('_id');
            res.body[1].should.have.property('name');
            res.body[1].should.have.property('data');
            res.body[1].name.should.equal('testFile2.pdf');
            res.body[1].data.should.be.a('array');
            expect(res.body[1].data).to.have.lengthOf(1);
            res.body[1].data[0].should.be.a('object');
            res.body[1].data[0].should.have.property('_id');
            res.body[1].data[0].should.have.property('version');
            res.body[1].data[0].should.have.property('title');
            res.body[1].data[0].should.have.property('author');
            res.body[1].data[0].should.have.property('created_date');
            res.body[1].data[0].should.have.property('tags');
            res.body[1].data[0].version.should.equal(1);
            res.body[1].data[0].title.should.equal('This is the second test file');
            res.body[1].data[0].author.should.equal('test user');
            res.body[1].data[0].tags.should.be.a('array');
            expect(res.body[1].data[0].tags).to.have.lengthOf(2);
            res.body[1].data[0].tags[0].should.equal('test');
            res.body[1].data[0].tags[1].should.equal('pdf');
            done();
        });
    });

    it('should add new file on /file POST', (done) => {
        chai.request(app)
        .post('/file')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            name: 'testFile3.doc',
            title: 'This is the third test file',
            author: 'test user',
            tags: ['test', 'doc']})
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            expect(res.body.data).to.have.lengthOf(1);
            res.body.data[0].should.be.a('object');
            res.body.data[0].should.have.property('_id');
            res.body.data[0].should.have.property('version');
            res.body.data[0].should.have.property('title');
            res.body.data[0].should.have.property('author');
            res.body.data[0].should.have.property('created_date');
            res.body.data[0].should.have.property('tags');
            res.body.name.should.equal('testFile3.doc');
            res.body.data[0].version.should.equal(1);
            res.body.data[0].title.should.equal('This is the third test file');
            res.body.data[0].author.should.equal('test user');
            res.body.data[0].tags.should.be.a('array');
            expect(res.body.data[0].tags).to.have.lengthOf(2);
            res.body.data[0].tags[0].should.equal('test');
            res.body.data[0].tags[1].should.equal('doc');
            done();
        });
    });

    it('should delete all files on /file DELETE', (done) => {
        chai.request(app)
        .del('/file')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('All files have been deleted');
            done();
        });
    });
});
