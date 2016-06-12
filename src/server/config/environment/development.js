'use strict';
const path = require('path');

module.exports = function (config) {
	config.MAIN_TEMPLATE =  path.join(config.TEMPLATE_PATH, 'development.jade');

	return {
		MAIN_TEMPLATE : config.MAIN_TEMPLATE
	};
};
