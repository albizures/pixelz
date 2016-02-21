const path = require('path');
module.exports = function (TEMPLATE_PATH) {
	return {
			MAIN_TEMPLATE : path.join(TEMPLATE_PATH, 'development.jade')
	};
};
