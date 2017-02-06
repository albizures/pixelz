const request = require('supertest');

let req;

const config = (req, status) =>
  req
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(status);

const types = {
  get: (url, status, cb) => config(req.get(url), status).end(cb),
  post: (url, status, cb, data) => config(req.post(url), status).send(data).end(cb),
  put: (url, status, cb, data) => config(req.put(url), status).send(data).end(cb),
  delete: (url, status, cb) => config(req.delete(url), status).end(cb),
};


module.exports = function (app) {
  req = request(app);
  return types;
};
