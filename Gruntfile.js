const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    decomment: {
      any: {
        // remove comments added by webpack from the build
        files: {
          './dist/p5.drawer.js': './dist/p5.drawer.js'
        },
        options: {
          ignore: [
            // keep JSDoc comments (p5.js repo's YUIDoc task parses those for documentation)
            /\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\//g,
            // keep the version number
            /.*Version.*/
          ]
        }
      }
    },
    // Configure style consistency
    eslint: {
      source: {
        options: { configFile: './.eslintrc' },
        src: ['src/**/*.js']
      }
    },
    watch: {
      options: {
        livereload: true
      },
      exampleDir: {
        files: ['examples/**/*.*']
      },
      distDir: {
        files: ['src/**/*.js'],
        tasks: ['devBuild'],
        options: {
          reload: true
        }
      },
      testDir: {
        files: ['test/**/*test*.js', 'test/index.html']
      },
      configFiles: {
        files: ['Gruntfile.js', 'webpack.config.js'],
        options: {
          reload: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    webpack: {
      prod: webpackConfig.prod,
      dev: webpackConfig.dev,
      test: webpackConfig.test
    },
    clean: {
      coverage: ['coverage'],
      dist: ['dist']
    },
    open: {
      testChrome: {
        path: 'http://localhost:8000/test',
        app: 'Chrome'
      },
      testFirefox: {
        path: 'http://localhost:8000/test',
        app: 'Firefox'
      },
      testSafari: {
        path: 'http://localhost:8000/test',
        app: 'Safari'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          livereload: 35729,
          hostname: 'localhost'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-decomment');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('lint', ['eslint:source']);
  grunt.registerTask('default', ['lint', 'webpack:prod', 'decomment']);
  grunt.registerTask('devBuild', ['webpack:dev']);
  grunt.registerTask('dev', [
    'connect',
    'devBuild',
    'open:testChrome',
    'watch'
  ]);
  grunt.registerTask('serve', 'connect:server:keepalive');
  grunt.registerTask('run-tests', ['clean:coverage', 'karma']);
};
