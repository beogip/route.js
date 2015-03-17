module.exports = function(grunt){
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcFiles: [
            'src/*.js'
        ],
        jshint : {
          files: ['src/**/*.js', 'test/**/*Spec.js'],
          options: {
            bitwise: true,
            curly: true,
            forin: true,
            maxdepth: 3,
            latedef: true,
            noarg: true,
            eqnull: true,
            nonew: true,
            undef: true,
            unused: true,
            browser: true,
            jasmine: true,
            globals: {
              module: true,
              define: true,
              console: true,
              inject: true,
              $: true
            }
          }
        },
        concat: {
            prod: {
                src: ['<%= srcFiles %>'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['<%= srcFiles %>'],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        karma: {
          options:{
            basePath: '',
            frameworks: ['jasmine'],
            files: [
              'src/*.js',
              'test/*Spec.js'
            ],
          },
          prod: {
            browsers: ['Chrome', 'Safari', 'Firefox', 'PhantomJS'],
            singleRun: true
          },
          dev: {
            browsers: ['Chrome'],
            autoWatch: true
          }
        },
        clean: ['build'],
        concurrent:{
          options: {
            logConcurrentOutput: true
          },
          dev: {
            tasks: ['karma:dev', 'watch:jshint']
          }
        },
        watch: {
          jshint: {
            files: ['<%= jshint.files %>'],
            options: {
              spawn: false,
            },
            tasks: ['jshint']
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-concurrent');

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('prod', ['clean', 'jshint', 'karma:prod', 'uglify', 'concat:prod']);
    // Default task(s).
    grunt.registerTask('default', ['concurrent:dev']);


};
