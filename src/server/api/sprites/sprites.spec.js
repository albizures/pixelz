const path = require('path');
const { expect } = require('chai');
const request = require('supertest');
const Promise = require('bluebird');
const app = require('../../index');
const { Sprite, SpriteHistory, User } = require('../../models');
const passportStub = require('../../components/utils/passportStub.js');

const req = request(app);
let user;

describe('sprites', function () {
  before(() => Promise.all([
    SpriteHistory.remove({}),
    Sprite.remove({}),
    User.remove({})
      .then(() => User.create({
        username: 'testuser',
        displayName: 'Test user'
      })).then(_user => {
        user = _user;
        passportStub.login(user);
      })
  ]));
  let id;
  it('GET / empty array', done => {
    req
      .get('/api/sprites')
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
    req
      .get('/api/sprites/57dc93358b334e5c0d331802')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        expect(res.body).to.be.null;
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /public empty array', done => {
    req
      .get('/api/sprites/public')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.empty;
        expect(err).to.be.null;
        done();
      });
  });
  it('POST / create a sprite', done => {
    req
      .post('/api/sprites')
      .field('body', JSON.stringify({
        title: 'new sprite',
        width: 10,
        height: 10,
        private: false,
        colors: ['#000', '#fff'],
        type: 'gif',
        frames: 2,
        layers: 5
      }))
      .attach('files', path.join(__dirname, 'sprite.preview.gif'))
      .attach('files', path.join(__dirname, 'sprite.file.png'))
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        id = res.body._id;
        expect(res.body).to.have.any.keys('preview', 'file');
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('new sprite');
        expect(res.body.width).to.equal(10);
        expect(res.body.height).to.be.equal(10);
        expect(res.body.private).to.be.false;
        expect(res.body.colors).to.deep.equal(['#000', '#fff']);
        expect(res.body.type).to.be.equal('gif');
        expect(res.body.frames).to.be.equal(2);
        expect(res.body.layers).to.be.equal(5);
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id found', done => {
    req
      .get('/api/sprites/' + id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.any.keys('preview', 'file');
        expect(res.body.private).to.be.a('boolean');
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('new sprite');
        expect(res.body.width).to.equal(10);
        expect(res.body.height).to.be.equal(10);
        expect(res.body.colors).to.deep.equal(['#000', '#fff']);
        expect(res.body.type).to.be.equal('gif');
        expect(res.body.frames).to.be.equal(2);
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id/history empty', done => {
    req
      .get('/api/sprites/' + id + '/history')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.empty;
        expect(err).to.be.null;
        done();
      });
  });
  it('PUT / update', done => {
    req
      .put('/api/sprites/' + id)
      .field('body', JSON.stringify({
        title: 'new title sprite',
        width: 14,
        height: 10,
        private: false,
        colors: ['#f00', '#fff'],
        type: 'gif',
        frames: 2,
        layers: 5
      }))
      .attach('files', path.join(__dirname, 'sprite.preview.gif'))
      .attach('files', path.join(__dirname, 'sprite.file.png'))
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        id = res.body._id;
        console.log('update', res.body);
        expect(res.body).to.have.any.keys('preview', 'file');
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('new title sprite');
        expect(res.body.width).to.equal(14);
        expect(res.body.height).to.be.equal(10);
        expect(res.body.private).to.be.false;
        expect(res.body.colors).to.deep.equal(['#f00', '#fff']);
        expect(res.body.type).to.be.equal('gif');
        expect(res.body.frames).to.be.equal(2);
        expect(res.body.layers).to.be.equal(5);
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id/history one element', done => {
    req
      .get('/api/sprites/' + id + '/history')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.lengthOf(1);
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id public', done => {
    passportStub.logout(user);
    req
      .get('/api/sprites/' + id)
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.any.keys('preview');
        expect(res.body.file).to.be.undefined;
        expect(res.body.private).to.be.undefined;
        expect(res.body.user).to.equal(user._id.toString());
        expect(res.body.title).to.equal('new title sprite');
        expect(res.body.width).to.equal(14);
        expect(res.body.height).to.be.equal(10);
        expect(res.body.colors).to.deep.equal(['#f00', '#fff']);
        expect(res.body.type).to.be.equal('gif');
        expect(res.body.frames).to.be.equal(2);
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /:id/history Unauthorized', done => {
    req
      .get('/api/sprites/' + id + '/history')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function (err, res) {
        expect(res.body).to.deep.equal({error: 'Unauthorized'});
        expect(err).to.be.null;
        done();
      });
  });
  it('POST / anonymous', done => {
    req
      .post('/api/sprites')
      .field('body', JSON.stringify({
        title: 'new sprite',
        width: 10,
        height: 10,
        private: false,
        colors: ['#000', '#fff'],
        type: 'gif',
        frames: 2,
        layers: 5
      }))
      .attach('files', path.join(__dirname, 'sprite.preview.gif'))
      .attach('files', path.join(__dirname, 'sprite.file.png'))
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        id = res.body._id;
        expect(res.body).to.have.any.keys('preview', 'file');
        expect(res.body.title).to.equal('new sprite');
        expect(res.body.width).to.equal(10);
        expect(res.body.height).to.be.equal(10);
        expect(res.body.private).to.be.false;
        expect(res.body.colors).to.deep.equal(['#000', '#fff']);
        expect(res.body.type).to.be.equal('gif');
        expect(res.body.frames).to.be.equal(2);
        expect(res.body.layers).to.be.equal(5);
        expect(err).to.be.null;
        done();
      });
  });
  it('PUT /:id Unauthorized', done => {
    req
      .put('/api/sprites/' + id)
      .field('body', JSON.stringify({
        title: 'new title sprite',
        width: 14,
        height: 10,
        private: false,
        colors: ['#f00', '#fff'],
        type: 'gif',
        frames: 2,
        layers: 5
      }))
      .attach('files', path.join(__dirname, 'sprite.preview.gif'))
      .attach('files', path.join(__dirname, 'sprite.file.png'))
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err) {
        expect(err).to.be.null;
        done();
      });
  });
  // TODO: clean files-test folder
});
