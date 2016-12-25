const passportStub = require('../../components/utils/passportStub.js');

const { expect } = require('chai');
const request = require('supertest');
// const Promise = require('bluebird');
const app = require('../../index');
const { User } = require('../../models');

const req = request(app);

describe('auth', () => {
  before(function () {
    User.remove({})
      .then(() => User.create({
        username: 'testuser',
        displayName: 'Test user'
      })).then(user => {
        passportStub.login(user);
      });
  });
  it('GET /whoami Somebody', done => {
    req
      .get('/api/auth/whoami')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.any.keys('username', '_id', 'displayName', 'profileImage');
        expect(err).to.be.null;
        done();
      });
  });
  it('GET /whoami Nobody', done => {
    passportStub.logout();
    req
      .get('/api/auth/whoami')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        expect(res.body).to.equal('');
        expect(err).to.be.null;
        done();
      });
  });
});