const path = require("path"),
      BUILD_PATH = path.resolve(__dirname,'..' ,'dist');

function getIndex(req, res) {
	res.sendFile(path.resolve(BUILD_PATH, 'index.html'));
}

module.exports = function (app) {

	app.use('/', getIndex);
	app.use('/index', getIndex);
	app.use('/index.html', getIndex);
}
