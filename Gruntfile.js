module.exports = function(grunt) {
  
  grunt.initConfig({
    
    // ---------------------------------------------------------------------
    // | Project Settings                                                  |
    // ---------------------------------------------------------------------

    pkg: grunt.file.readJSON('package.json'),

    settings: {
        dir: {
            src: 'src',
            dist: 'dist',
            sub: 'dist/sub/'
        }
    },
    
    // ---------------------------------------------------------------------
    // | Tasks Configurations                                              |
    // ---------------------------------------------------------------------

    // Copy files that don't need compilation to <%= settings.dir.dist %>
    copy: {
        dist: {
            files: [
                  // Copy files with selected extention
                  {dest: '<%= settings.dir.dist %>/', src: ['*.php','*.html', '*.ico'], filter: 'isFile', expand: true, cwd: '<%= settings.dir.src %>/'},                  
                  // Copy dot file
                  {dest: '<%= settings.dir.dist %>/.htaccess', src: '<%= settings.dir.src %>/.htaccess'},                  
                  // Copy images
                  {dest: '<%= settings.dir.dist %>/', src: 'img/**', expand: true, cwd: '<%= settings.dir.src %>/'},
                  // Copy fonts
                  {dest: '<%= settings.dir.dist %>/', src: 'font/**', expand: true, cwd: '<%= settings.dir.src %>/'}
            ]
        }
    },
    
    // Compile less files to css files and move all to destination folder
    less: {
        compile: {
            files: {
              '<%= settings.dir.dist %>/css/main.min.css': '<%= settings.dir.src %>/css/main.less',
              '<%= settings.dir.dist %>/css/ie.min.css': '<%= settings.dir.src %>/css/ie.less'
            }
        }
    },
    // Minify css files and move all to the destination folder
    cssmin: {
        compress: {
            files: {
              '<%= settings.dir.dist %>/css/main.min.css': '<%= settings.dir.dist %>/css/main.min.css',
              '<%= settings.dir.dist %>/css/ie.min.css': '<%= settings.dir.dist %>/css/ie.min.css'
            }
        }
    },    
    // Minify javascript files and move all to destination folder
    uglify: {
        options:{
          compress:true
        },
        static_mappings:{ 
              files:[
                  {src:'<%= settings.dir.dist %>/js/main.min.js', dest:'<%= jshint.all %>'},
                  {src:'<%= settings.dir.dist %>/js/sub.min.js', dest:'<%= settings.dir.src %>/js/test2.js'},
              ]
        }        
    },
    // Test all JavaScript
    jshint: {
        options: {
                jshintrc: '.jshintrc'
        },
        all:[
                '<%= settings.dir.src %>/js/**/*.js',
                '<%= settings.dir.src %>/js/*.js'
            ],
        child: [  '<%= settings.dir.src %>/js/test2.js' ]

    },    
    // Watch the sources files
    watch: {
        all:{
            relcss:{
                files: ['<%= settings.dir.src %>/**/*.less'],
                tasks: ['less']            
            },
            js:{
                files: [ '<%= jshint.all %>' ],
                tasks: ['uglify']
            }
        },
        child:{            
                files: ['<%= settings.dir.src %>/js/test2.js'], 
                tasks: ['uglify:files']
              
        }

    },   
    //minify image
    imagemin: {
        dist: {
            options: {
              cache: false
            },
            files: [{
              expand: true,
              cwd: '<%= settings.dir.src %>/img/',
              src: ['*.{png,jpg,gif}'],
              dest: '<%= settings.dir.dist %>/img/'
            }]
        }
    },   
    // Clean all dis files
    clean: {
        dist: '<%= settings.dir.dist %>/*'
    },
    // Mutiple Task
    concurrent: {

        prod: {
            tasks: ["watch:A", "watch:C"],
            options: {
                logConcurrentOutput: true
            },            
        },
        dev: {
            tasks: ["watch:child"],
            options: {
                logConcurrentOutput: true
            }
        }
    }

  //end    
  });
  
  // -------------------------------------------------------------------------
  // | Load Related Tasks                                                    |
  // -------------------------------------------------------------------------  

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-concurrent');

  // -------------------------------------------------------------------------
  // | Register Custom Tasks                                                 |
  // -------------------------------------------------------------------------  
  grunt.registerTask('build', ['clean', 'copy', 'less', 'uglify', 'cssmin', 'imagemin']);

  grunt.registerTask('dev',['concurrent:dev']);
  
  grunt.registerTask('cln', ['clean']);  

};