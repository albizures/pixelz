const { expect } = require('chai');
const request = require('supertest');

const app = require('../../index');
const { User } = require('../../models');

describe('Users', () => {
  let id;
  before(function(){
    return User.remove({});
  });
  it('GET / empty array', done => {
    request(app)
      .get('/api/users/')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.empty;
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id Not Found', done => {
    request(app)
      .get('/api/users/57dc93358b334e5c0d331802')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        expect(res.body).to.be.null;
        expect(err).to.be.null;
        done();
      });
  });
  it('POST / ok', done => {
    request(app)
      .post('/api/users')
      .send({
        username: 'testname',
        displayName: 'Test Name',
        email: 'email@test.com'
      })
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        id = res.body._id;
        expect(res.body).to.have.all.keys('__v', 'username', 'displayName', 'email', '_id', 'profileImage');
        expect(res.body.username).to.equal('testname');
        expect(res.body.displayName).to.equal('Test Name');
        expect(res.body.email).to.equal('email@test.com');
        expect(res.body.profileImage).to.be.a('string');
        expect(err).to.be.null;
        done();
      });
  });
  it('GET / one element', done => {
    request(app)
      .get('/api/users/')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.length).to.equal(1);
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id Found', done => {
    request(app)
      .get('/api/users/' + id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.any.keys('username', 'displayName', '_id', 'profileImage');
        expect(err).to.be.null;
        done();
      });
  });

  it('GET /:id invalid id', done => {
    request(app)
      .get('/api/users/an-invalid-name')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.body).to.have.any.keys('message', 'path', 'type', 'context');
        done();
      });
  });
  it('POST /:id invalid property', done => {
    request(app)
      .post('/api/users')
      .send({
        username: 'test-name',
        displayName: 'Test Name',
        email: 'non-email'
      })
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        expect(res.body).to.have.any.keys('message', 'path', 'type', 'context');
        expect(err).to.be.null;
        done();
      });
  });
  it('PUT /:id ok', done => {
    request(app)
      .put('/api/users/' + id)
      .send({
        username: 'newusername',
        displayName: 'New Test Name',
        email: 'newemail@test.com'
      })
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.any.keys('__v', 'username', 'displayName', 'email', '_id', 'profileImage');
        expect(res.body.username).to.equal('newusername');
        expect(res.body.displayName).to.equal('New Test Name');
        expect(res.body.email).to.equal('newemail@test.com');
        expect(err).to.be.null;
        done();
      });
  });
  it('PUT /:id invalid property', done => {
    request(app)
      .put('/api/users/' + id)
      .send({
        username: 'test-name',
        displayName: 'Test Name',
        email: 'non-email'
      })
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        expect(res.body).to.have.any.keys('message', 'path', 'type', 'context');
        expect(err).to.be.null;
        done();
      });
  });
});
