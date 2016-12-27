const { expect } = require('chai');
const request = require('../../components/utils/supertest');
const Promise = require('bluebird');
const app = require('../../index');
const { User, Editor, Palette } = require('../../models');
const passportStub = require('../../components/utils/passportStub.js');


const req = request(app);
let user;
let lastEditor;
let palette;

describe('/api/editor/', function () {
  before(() => Promise.all([
    Editor.remove({}),
    User.remove({})
      .then(() => User.create({
        username: 'testnewuser',
        displayName: 'Test user'
      })).then(_user => {
        user = _user;
        passportStub.login(user);
        return Palette.create({
          title: 'new palette',
          user: user._id,
          colors: ['#ff0']
        });
      }).then(function (_palette) {
        palette = _palette;
      })
  ]));
  it('GET / Empty array', done => {
    passportStub.login(user);
    req.get('/api/editor/', 200, function (err, res) {
      expect(res.body).to.be.empty;
      expect(err).to.be.null;
      done();
    });
  });
  it('GET /user Empty array', done => {
    passportStub.login(user);
    req.get('/api/editor/user', 200, function (err, res) {
      expect(res.body).to.be.empty;
      expect(err).to.be.null;
      done();
    });
  });
  it('GET /user/last Not found', done => {
    passportStub.login(user);
    req.get('/api/editor/user/last', 404, function (err, res) {
      expect(res.body).to.be.null;
      expect(err).to.be.null;
      done();
    });
  });
  it('GET / Unauthorized', done => {
    passportStub.logout(user);
    req.get('/api/editor/', 401, function (err, res) {
      expect(res.body).to.deep.equal({error: 'Unauthorized'});
      expect(err).to.be.null;
      done();
    });
  });
  it('GET /user/ Unauthorized', done => {
    passportStub.logout(user);
    req.get('/api/editor/user/', 401, function (err, res) {
      expect(res.body).to.deep.equal({error: 'Unauthorized'});
      expect(err).to.be.null;
      done();
    });
  });
  it('GET /user/last Unauthorized', done => {
    passportStub.logout(user);
    req.get('/api/editor/user/last', 401, function (err, res) {
      expect(res.body).to.deep.equal({error: 'Unauthorized'});
      expect(err).to.be.null;
      done();
    });
  });
  it('POST / Unauthorized', done => {
    passportStub.logout(user);
    req.post('/api/editor/', 401, function (err, res) {
      expect(res.body).to.deep.equal({error: 'Unauthorized'});
      expect(err).to.be.null;
      done();
    });
  });
  it('PUT / Unauthorized', done => {
    passportStub.logout(user);
    req.put('/api/editor/57dc93358b334e5c0d331802', 401, function (err, res) {
      expect(res.body).to.deep.equal({error: 'Unauthorized'});
      expect(err).to.be.null;
      done();
    });
  });
  it('POST / Create one', done => {
    passportStub.login(user);
    req.post('/api/editor/', 201, function (err, res) {
      lastEditor = res.body;
      expect(res.body.user).to.equal(user._id.toString());
      expect(res.body.title).to.be.a('string');
      expect(res.body.sprites).to.deep.equal([]);
      expect(res.body.layout).to.deep.equal({test: 'test'});
      expect(res.body.palette).to.equal(palette._id.toString());
      expect(err).to.be.null;
      done();
    }, {
      sprites: [],
      layout: {
        test: 'test'
      },
      palette: palette._id
    });
  });
  it('PUT / Update', done => {
    passportStub.login(user);
    req.put('/api/editor/' + lastEditor._id, 200, function (err, res) {
      expect(res.body.user).to.equal(user._id.toString());
      expect(res.body.title).to.be.a('string');
      expect(res.body.sprites).to.deep.equal([]);
      expect(res.body.layout).to.deep.equal({test2: 'test2'});
      expect(res.body.palette).to.equal(palette._id.toString());
      expect(err).to.be.null;
      done();
    }, { layout: { test2: 'test2'} });
  });
});