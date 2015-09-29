module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
 /*   concat: {
      options: {
        separator: ';'
        // sourceMap: true,
        // sourceMapName: 'public/dist/shortymcshortly.js.map',
        // sourceMapStyle: 'link'
      },
      client: {
        src: 'public/client/*.js',
        dest: 'public/dist/shortymcshortly.js'
      },
      dependencies: {
        src: [
          'public/lib/jquery.js',
          'public/lib/underscore.js',
          'public/lib/backbone.js',
          'public/lib/handlebars.js'
        ],
        dest: 'public/dist/dependencies.js'
      }
    },*/
    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      preReqs: {
        command: [
              'brew install imageMagick graphicsMagick'
          ].join('&&'),
        options: {
            stderr: false
        }
      }
    },


    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['Server/test/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'Server/server.js'
      }
    },

    /*uglify: {
      options: {
        // sourceMap: true,
        // sourceMapIncludeSources: true,
        // sourceMapIn: 'public/dist/shortymcshortly.js.map'
      },
      client: {
        src: '<%= concat.client.dest %>',
        //.tmp is a best practice for intermediary files/garbage.
        dest: 'public/dist/shortymcshortly.min.js'
      },
      dependencies: {
        src: '<%= concat.dependencies.dest %>',
        //.tmp is a best practice for intermediary files/garbage.
        dest: 'public/dist/dependencies.min.js'
      },
    },*/

    /*jshint: {
      files: [
        // Add filespec list here
        '*.js',
        'app/*.js',
        'app/*.js',
        'lib/*.js',
        'public/*.js',
        'public/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/*'
        ]
      }
    },*/

   /* cssmin: {
        // Add filespec list here
      target: {
        files: [{
          src: 'public/style.css',
          dest: 'public/dist/style.min.css'
        }]
      }
    },*/

    /*watch: {
      scripts: {
        files: [
          'public/client/*.js',
          'public/lib/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
 */ });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-npm-install');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-contrib-concat');
//  grunt.loadNpmTasks('grunt-contrib-cssmin');
//  grunt.loadNpmTasks('grunt-nodemon');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    //grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {

      grunt.task.run([ 'shell:prodServer' ]);
          } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

   grunt.registerTask('test', [
     'mochaTest'
   ]);

//  grunt.registerTask('build', [
//    'cssmin',
//    'concat',
//    'uglify'
//  ]);

 grunt.registerTask('deploy', [
    'test',
      'upload'
 ]);

 grunt.registerTask('default', [
    'npm-install',
    'shell:preReqs',
    'mochaTest'
 ]);


};