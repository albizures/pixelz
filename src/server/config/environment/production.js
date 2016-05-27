const path = require('path');

module.exports = function (config) {
	return {
			MAIN_TEMPLATE : path.join(config.TEMPLATE_PATH, 'production.jade')
	};
};
