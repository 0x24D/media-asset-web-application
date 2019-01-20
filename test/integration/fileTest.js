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
    var file1Id, file2Id;
    beforeEach((done) => {
        const newFile1 = new File({
            name: 'testFile1.txt',
            data: [{
                title: 'This is the first test file',
                author: 'test user',
                tags: ['test', 'txt']
            }]
        });
        file1Id = String(newFile1._id);
        const newFile2 = new File({
            name: 'testFile2.pdf',
            data: [{
                title: 'This is the second test file',
                author: 'test user',
                tags: ['test', 'pdf']
            }]
        });
        file2Id = String(newFile2._id);
        File.insertMany([newFile1, newFile2], () => {
            done();
        });
    });

    afterEach((done) => {
        File.collection.drop();
        done();
    });

    it('should list all files on /v1/files GET', (done) => {
        chai.request(app)
        .get('/v1/files')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            expect(res.body).to.have.lengthOf(2);

            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('data');
            res.body[0]._id.should.equal(file1Id);
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
            res.body[1]._id.should.equal(file2Id);
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

    it('should add new file on /v1/files POST', (done) => {
        chai.request(app)
        .post('/v1/files')
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

    it('should error on /v1/files PUT', (done) => {
        chai.request(app)
        .put('/v1/files')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should delete all files on /v1/files DELETE', (done) => {
        chai.request(app)
        .del('/v1/files')
        .end((err, res) => {
            res.should.have.status(204);
            // TODO: how to check number of files left? File.countDocuments returns null
            done();
        });
    });

    it('should list 1 file on /v1/files/<id> GET', (done) => {
        chai.request(app)
        .get(`/v1/files/${file1Id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('data');
            res.body._id.should.equal(file1Id);
            res.body.name.should.equal('testFile1.txt');
            res.body.data.should.be.a('array');
            expect(res.body.data).to.have.lengthOf(1);
            res.body.data[0].should.be.a('object');
            res.body.data[0].should.have.property('_id');
            res.body.data[0].should.have.property('version');
            res.body.data[0].should.have.property('title');
            res.body.data[0].should.have.property('author');
            res.body.data[0].should.have.property('created_date');
            res.body.data[0].should.have.property('tags');
            res.body.data[0].version.should.equal(1);
            res.body.data[0].title.should.equal('This is the first test file');
            res.body.data[0].author.should.equal('test user');
            res.body.data[0].tags.should.be.a('array');
            expect(res.body.data[0].tags).to.have.lengthOf(2);
            res.body.data[0].tags[0].should.equal('test');
            res.body.data[0].tags[1].should.equal('txt');
            done();
        });
    });

    it('should error on /v1/files/<id> POST', (done) => {
        chai.request(app)
        .post('/v1/files/123')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should add new version on /v1/files/<id> PUT', (done) => {
        chai.request(app)
        .put(`/v1/files/${file1Id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            title: 'This is the first test file - second version',
            author: 'test user',
            tags: ['test', 'txt', 'iteration']})
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('data');
            res.body._id.should.equal(file1Id);
            res.body.name.should.equal('testFile1.txt');
            res.body.data.should.be.a('array');
            expect(res.body.data).to.have.lengthOf(2);
            res.body.data[1].should.be.a('object');
            res.body.data[1].should.have.property('_id');
            res.body.data[1].should.have.property('version');
            res.body.data[1].should.have.property('title');
            res.body.data[1].should.have.property('author');
            res.body.data[1].should.have.property('created_date');
            res.body.data[1].should.have.property('tags');
            res.body.data[1].version.should.equal(2);
            res.body.data[1].title.should.equal('This is the first test file - second version');
            res.body.data[1].author.should.equal('test user');
            res.body.data[1].tags.should.be.a('array');
            expect(res.body.data[1].tags).to.have.lengthOf(3);
            res.body.data[1].tags[0].should.equal('test');
            res.body.data[1].tags[1].should.equal('txt');
            res.body.data[1].tags[2].should.equal('iteration');
            done();
        });
    });

    it('should delete 1 file on /v1/files/<id> DELETE', (done) => {
        chai.request(app)
        .del(`/v1/files/${file1Id}`)
        .end((err, res) => {
            res.should.have.status(204);
            // TODO: how to check number of files left? File.countDocuments returns null
            done();
        });
    });

    it('should list 1 file with 1 version on /v1/files/<id>/<version> GET', (done) => {
        const mvFile = new File({
            name: 'multipleVersions.txt',
            data: [{
                version: 1,
                title: 'This is the first version',
                author: 'test user',
                tags: ['test', 'txt']
            },
            {
                version: 2,
                title: 'This is the second version',
                author: 'test user',
                tags: ['test', 'txt']
            }]
        });
        const mvFileId = String(mvFile._id);
        mvFile.save();

        chai.request(app)
        .get(`/v1/files/${mvFileId}/2`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('version');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('created_date');
            res.body.should.have.property('tags');
            res.body._id.should.equal(mvFileId);
            res.body.name.should.equal('multipleVersions.txt');
            res.body.version.should.equal(2);
            res.body.title.should.equal('This is the second version');
            res.body.author.should.equal('test user');
            res.body.tags.should.be.a('array');
            expect(res.body.tags).to.have.lengthOf(2);
            res.body.tags[0].should.equal('test');
            res.body.tags[1].should.equal('txt');
            done();
        });
    });

    it('should error on /v1/files/<id>/<version> POST', (done) => {
        chai.request(app)
        .post('/v1/files/123/1')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should error on /v1/files/<id>/<version> PUT', (done) => {
        chai.request(app)
        .put('/v1/files/123/1')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('should error on /v1/files/<id>/<version> DELETE', (done) => {
        chai.request(app)
        .del('/v1/files/123/1')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });
 });
