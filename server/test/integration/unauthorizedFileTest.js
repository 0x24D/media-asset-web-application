import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import mongoose from 'mongoose';
import app from '../../app';

import { FileSchema } from '../../src/models/fileModel';

const chaiHttp = require('chai-http');

const should = chai.should();

const File = mongoose.model('file', FileSchema);

chai.use(chaiHttp);

describe('Unauthorized file tests', () => {

  it('should error on /api/v1/files GET', (done) => {
    chai.request(app)
      .get('/api/v1/files')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files POST', (done) => {
    chai.request(app)
      .post('/api/v1/files')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files PUT', (done) => {
    chai.request(app)
      .put('/api/v1/files')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/files')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/files/123`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id> POST', (done) => {
    chai.request(app)
      .post('/api/v1/files/123')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id> PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/files/123`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id> DELETE', (done) => {
    chai.request(app)
      .del(`/api/v1/files/123`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id>/<version> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/files/123/2`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id>/<version> POST', (done) => {
    chai.request(app)
      .post('/api/v1/files/123/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id>/<version> PUT', (done) => {
    chai.request(app)
      .put('/api/v1/files/123/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/files/<id>/<version> DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/files/123/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
