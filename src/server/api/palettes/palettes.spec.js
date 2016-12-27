const { expect } = require('chai');
const request = require('supertest');
const Promise = require('bluebird');
const app = require('../../index');
const { User, Palette } = require('../../models');
const passportStub = require('../../components/utils/passportStub.js');

const req = request(app);
let user;
let palette;
describe('palettes', function () {
  before(() => Promise.all([
    Palette.remove({}),
    User.remove({})
      .then(() => User.create({
        username: 'testuser',
        displayName: 'Test user'
      })).then(_user => {
        user = _user;
        passportStub.login(user);
      })
  ]));
  it('GET / Empty array', done => {
    req
      .get('/api/palettes/')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.empty;
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id Not Found', done => {
    req
      .get('/api/palettes/57dc93358b334e5c0d331802')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        console.log(res.body);
        expect(err).to.be.null;
        done();
      });
  });
  it('POST / Create one public', done => {
    passportStub.login(user);
    req
      .post('/api/palettes/')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(201)
      .send({
        title: 'test palette',
        colors: ['#00f', '#ff0'],
        private: false
      })
      .end(function (err, res) {
        palette = res.body;
        expect(palette.user).to.equal(user._id.toString());
        expect(palette.title).to.equal('test palette');
        expect(palette.colors).to.deep.equal(['#00f', '#ff0']);
        expect(palette.private).to.be.false;
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id Found, is owner', done => {
    req
      .get('/api/palettes/' + palette._id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('test palette');
        expect(res.body.colors).to.deep.equal(['#00f', '#ff0']);
        expect(res.body.private).to.be.false;
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id Found, is not owner', done => {
    passportStub.logout(user);
    req
      .get('/api/palettes/' + palette._id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('test palette');
        expect(res.body.colors).to.deep.equal(['#00f', '#ff0']);
        expect(res.body.private).to.be.undefined;
        expect(err).to.be.null;
        done();
      });
  });
  it('PUT /:id Change, is private', done => {
    passportStub.login(user);
    req
      .put('/api/palettes/' + palette._id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .send({
        private: true
      })
      .end(function (err, res) {
        console.log('PUT private',res.body);
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('test palette');
        expect(res.body.colors).to.deep.equal(['#00f', '#ff0']);
        expect(res.body.private).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id Not Found, is not owner', done => {
    passportStub.logout(user);
    req
      .get('/api/palettes/' + palette._id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        console.log('NOT Found', res.body);
        expect(err).to.be.null;
        done();
      });
  });
  it('PUT /:id Change only the name', done => {
    passportStub.login(user);
    req
      .put('/api/palettes/' + palette._id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .send({
        title: 'test name palette'
      })
      .end(function (err, res) {
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('test name palette');
        expect(res.body.colors).to.deep.equal(['#00f', '#ff0']);
        expect(res.body.private).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
  it('POST / Anonymous', done => {
    passportStub.logout(user);
    req
      .post('/api/palettes/')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(201)
      .send({
        title: 'test anonymous palette',
        colors: ['#f00', '#ff0'],
        private: false
      })
      .end(function (err, res) {
        expect(res.body.title).to.equal('test anonymous palette');
        expect(res.body.colors).to.deep.equal(['#f00', '#ff0']);
        expect(res.body.private).to.be.false;
        expect(err).to.be.null;
        done();
      });
  });
});