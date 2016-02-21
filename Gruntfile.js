module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);
	grunt.initConfig({
		concurrent: {
			dev: {
				tasks: ['nodemon:server', 'nodemon:webpack'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		nodemon: {
			webpack : {
				script: 'src/webpack.local.config.js',
				options : {
					"verbose": true,
					"watch" : [
						"src/webpack.local.config.js"
					],
					"ignore":[
						"node_modules/",
						"public/",
						"src/server/",
						"src/client/"
					]
				}
			},
			server: {
				script: 'index.js',
				options : {
					"verbose": true,
					"watch" : [
						"src/server/"
					],
					"ignore":[
						"node_modules/",
						"public/",
						"src/client/"
					]
				}
			}
		}
	});
	grunt.registerTask('default', [
		'concurrent'
	]);
}
