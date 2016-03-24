module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);
	grunt.initConfig({
		execute: {
			build: {
				src: ['src/webpack.local.config.js']
			}
		},
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			build: {
				NODE_ENV: 'production'
			}
		},
		concurrent: {
			dev: {
				tasks: ['nodemon:server', 'nodemon:webpack'],
				options: {
					logConcurrentOutput: true
				}
			},
			build: {
				tasks: ['nodemon:webpack'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		nodemon: {
			webpack: {
				script: 'src/webpack.local.config.js',
				options: {
					"verbose": true,
					"watch": [
						"src/webpack.local.config.js"
					],
					"ignore": [
						"node_modules/",
						"public/",
						"src/server/",
						"src/client/"
					]
				}
			},
			server: {
				script: 'index.js',
				options: {
					"verbose": true,
					"watch": [
						"src/server/"
					],
					"ignore": [
						"node_modules/",
						"public/",
						"src/client/"
					]
				}
			}
		}
	});
	grunt.registerTask('default', [
		'env:dev',
		'concurrent:dev'
	]);
	grunt.registerTask('build', [
		'env:build',
		'execute:build'
	]);
}
