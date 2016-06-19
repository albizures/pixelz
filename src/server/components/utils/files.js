const fs = require('fs');
const path = require('path');
const config = require('../../config/environment');
const response = require('./response.js');

function mkdir(folder, cb, parent) {
  fs.mkdir(folder, onMkdir);
  function onMkdir(err) {
    if (err && err.code == 'ENOENT') {
      return mkdir(path.dirname(folder), onMkParent, true);
    }
    cb(response.commonResult(err, folder));
  }
  function onMkParent() {
    fs.mkdir(folder,  err => cb(response.commonResult(err, folder)));
  }
}

function write(file, data, cb) {
  file = path.join(config.FILES_PATH, file);

  function write(result) {
    if (result && result.code !== 0 && result.description && result.description.code !== 'EEXIST' ) {
      return cb(result);
    }
    fs.writeFile(
      file,
      data,
      onWrite
    );
  }
  function onWrite(err) {
    if (err && err.code == 'ENOENT') {
      return mkdir(path.dirname(file), write);
    }
    cb(response.commonResult(err, file));
  }
  write();
}

function update(file, data, cb) {
  fs.unlink(path.join(config.FILES_PATH, file), err => {
    writeFile(file, data, cb);
  });
}

function move(oldPath, newPath, cb) {
  fs.rename(
    path.join(config.FILES_PATH, oldPath),
    path.join(config.FILES_PATH, newPath),
    err => cb(response.commonResult(err, newPath))
  );
}


exports.move = move;
exports.write = write;
exports.update = write;
exports.join = path.join;
exports.mkdir = mkdir;