import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import mongoose from 'mongoose';
import app from '../../app';

import { FileSchema } from '../../src/models/fileModel';
import { UserSchema } from '../../src/models/userModel';

const chaiHttp = require('chai-http');

const should = chai.should();

const File = mongoose.model('file', FileSchema);
const User = mongoose.model('user', UserSchema);

chai.use(chaiHttp);

describe('Authorized file tests', () => {
  let file1Id;
  let file2Id;
  const token = '123456';
  before((done) => {
    const newUser1 = new User({
      username: 'testUser1',
      password: 'testPassword1',
      token: token,
    });
    newUser1.save();
    done();
  })
  beforeEach((done) => {
    const newFile1 = new File({
      name: 'testFile1.txt',
      data: [{
        title: 'This is the first test file',
        author: 'test user',
        tags: ['test', 'txt'],
      }],
    });
    file1Id = String(newFile1._id);
    const newFile2 = new File({
      name: 'testFile2.pdf',
      data: [{
        title: 'This is the second test file',
        author: 'test user',
        tags: ['test', 'pdf'],
      }],
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
  after((done) => {
    User.collection.drop();
    done();
  });

  it('should list latest version of all files on /api/v1/files GET', (done) => {
    const mvFile = new File({
      name: 'multipleVersions.txt',
      data: [{
        version: 1,
        title: 'This is the first version',
        author: 'test user',
        tags: ['test', 'txt'],
      },
      {
        version: 2,
        title: 'This is the second version',
        author: 'test user',
        tags: ['test', 'txt'],
      }],
    });
    const mvFileId = String(mvFile._id);
    mvFile.save();

    chai.request(app)
      .get('/api/v1/files')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(3);

        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('version');
        res.body[0].should.have.property('author');
        res.body[0].should.have.property('created_date');
        res.body[0].should.have.property('tags');
        res.body[0]._id.should.equal(file1Id);
        res.body[0].name.should.equal('testFile1.txt');
        res.body[0].version.should.equal(1);
        res.body[0].title.should.equal('This is the first test file');
        res.body[0].author.should.equal('test user');
        res.body[0].tags.should.be.a('array');
        expect(res.body[0].tags).to.have.lengthOf(2);
        res.body[0].tags[0].should.equal('test');
        res.body[0].tags[1].should.equal('txt');

        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('name');
        res.body[1].should.have.property('title');
        res.body[1].should.have.property('version');
        res.body[1].should.have.property('author');
        res.body[1].should.have.property('created_date');
        res.body[1].should.have.property('tags');
        res.body[1]._id.should.equal(file2Id);
        res.body[1].name.should.equal('testFile2.pdf');
        res.body[1].version.should.equal(1);
        res.body[1].title.should.equal('This is the second test file');
        res.body[1].author.should.equal('test user');
        res.body[1].tags.should.be.a('array');
        expect(res.body[1].tags).to.have.lengthOf(2);
        res.body[1].tags[0].should.equal('test');
        res.body[1].tags[1].should.equal('pdf');

        res.body[2].should.have.property('_id');
        res.body[2].should.have.property('name');
        res.body[2].should.have.property('title');
        res.body[2].should.have.property('version');
        res.body[2].should.have.property('author');
        res.body[2].should.have.property('created_date');
        res.body[2].should.have.property('tags');
        res.body[2]._id.should.equal(mvFileId);
        res.body[2].name.should.equal('multipleVersions.txt');
        res.body[2].version.should.equal(2);
        res.body[2].title.should.equal('This is the second version');
        res.body[2].author.should.equal('test user');
        res.body[2].tags.should.be.a('array');
        expect(res.body[2].tags).to.have.lengthOf(2);
        res.body[2].tags[0].should.equal('test');
        res.body[2].tags[1].should.equal('txt');

        done();
      });
  });

  it('should add new file on /api/v1/files POST', (done) => {
    chai.request(app)
      .post('/api/v1/files')
      .set('Authorization', token)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: 'testFile3.doc',
        title: 'This is the third test file',
        author: 'test user',
        tags: ['test', 'doc'],
      })
      .end((err, res) => {
        res.should.have.status(201);
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

  it('should error on /api/v1/files PUT', (done) => {
    chai.request(app)
      .put('/api/v1/files')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should delete all files on /api/v1/files DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/files')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(204);
        // TODO: how to check number of files left? File.countDocuments returns null
        done();
      });
  });

  it('should list latest version of 1 file on /api/v1/files/<id> GET', (done) => {
    const mvFile = new File({
      name: 'multipleVersions.txt',
      data: [{
        version: 1,
        title: 'This is the first version',
        author: 'test user',
        tags: ['test', 'txt'],
      },
      {
        version: 2,
        title: 'This is the second version',
        author: 'test user',
        tags: ['test', 'txt'],
      }],
    });
    const mvFileId = String(mvFile._id);
    mvFile.save();

    chai.request(app)
      .get(`/api/v1/files/${mvFileId}`)
      .set('Authorization', token)
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

  it('should error on /api/v1/files/<id> POST', (done) => {
    chai.request(app)
      .post('/api/v1/files/123')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should add new version on /api/v1/files/<id> PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/files/${file1Id}`)
      .set('Authorization', token)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        title: 'This is the first test file - second version',
        author: 'test user',
        tags: ['test', 'txt', 'iteration'],
      })
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

  it('should delete 1 file on /api/v1/files/<id> DELETE', (done) => {
    chai.request(app)
      .del(`/api/v1/files/${file1Id}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(204);
        // TODO: how to check number of files left? File.countDocuments returns null
        done();
      });
  });

  it('should list 1 file with 1 version on /api/v1/files/<id>/<version> GET', (done) => {
    const mvFile = new File({
      name: 'multipleVersions.txt',
      data: [{
        version: 1,
        title: 'This is the first version',
        author: 'test user',
        tags: ['test', 'txt'],
      },
      {
        version: 2,
        title: 'This is the second version',
        author: 'test user',
        tags: ['test', 'txt'],
      }],
    });
    const mvFileId = String(mvFile._id);
    mvFile.save();

    chai.request(app)
      .get(`/api/v1/files/${mvFileId}/2`)
      .set('Authorization', token)
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

  it('should error on /api/v1/files/<id>/<version> POST', (done) => {
    chai.request(app)
      .post('/api/v1/files/123/1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should error on /api/v1/files/<id>/<version> PUT', (done) => {
    chai.request(app)
      .put('/api/v1/files/123/1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should error on /api/v1/files/<id>/<version> DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/files/123/1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
