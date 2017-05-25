var gulp        = require('gulp');
var browserSync = require('browser-sync');
var browserify  = require('browserify');
var watchify    = require('watchify');
var buffer      = require('vinyl-buffer');
var merge       = require('merge');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var concat      = require('gulp-concat-util');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var uncss       = require('gulp-uncss');
var cleanCSS    = require('gulp-clean-css');
var jshint      = require('gulp-jshint');
var babel       = require('gulp-babel');
var transform   = require('vinyl-transform');
var imageop     = require('lossy-imagemin');
var deploy      = require("gulp-gh-pages");


var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('images', function(cb) {
    gulp.src(['images/*.*']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('images/dist')).on('end', cb).on('error', cb);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});


var jsFiles = 'js/*.js',
    jsDest = 'js/dist';

// gulp.task('js', function() {
// return gulp.src(jsFiles)
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'))
//     //.pipe(jshint.reporter('fail'))
//     .pipe(concat('scripts.js'))
//     .pipe(gulp.dest(jsDest))
//     .pipe(rename('scripts.min.js'))
//     .pipe(babel({
//             presets: ['es2015']
//         }))
//     .pipe(uglify())
//     //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
//     .pipe(gulp.dest(jsDest));
//     browserSync.reload();
// });

gulp.task('js:main', function() {
  gulp.src("js/*.js")
    // .pipe(babel({
    //   presets: ["es2015"]
    // }))
    //.pipe(jshint())
    //.pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat("main.js"))
    // .pipe(browserify({
    //     insertGlobals : true,
    //     debug : !gulp.env.production
    //   }))
    .pipe(uglify())
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(gulp.dest("js/dist/"));
});

gulp.task('js:vendor', function() {
  gulp.src("js/vendor/*.js")
    // .pipe(babel({
    //   presets: ["es2015"]
    // }))
    //.pipe(jshint())
    //.pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat("vendor.js"))
    // .pipe(browserify({
    //     insertGlobals : true,
    //     debug : !gulp.env.production
    //   }))
    .pipe(uglify())
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(gulp.dest("js/dist/"));
});


gulp.task('js', ['js:main', 'js:vendor']);


gulp.task('babel', function() {
  gulp.src("js/vendor/lastfm-listener.js")
    .pipe(babel({
      presets: ["es2015"]
    }))
    //.pipe(uglify())
    .pipe(gulp.dest("js/dist/"));
});


// Optimize images

gulp.task('images-optim', () => {
  return gulp.src('images/*')
  .pipe($$.imagemin({
    optimizationLevel: 7,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest('images/dist'));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */


gulp.task('sass', ['sass:styles', 'sass:critical']);


gulp.task('sass:styles', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(cleanCSS())
        .pipe(uncss({
                html: ['*.html', '_includes/*.html','_layouts/*.html','_projects/*.html','_posts/*.html'],
                ignore: [/\.bg-gray/, /\.bg-white/, /\.pa4-l/, /\.hover-white/, /\.hover-black/, /\.mr4/, /\.mr5-ns/, /\.sans-serif/, /\.bg-black/, /\.cover/, /\.bg-center/, /\.f5-ns/, /\.mv5/, /\.mv3/, /\.mv5-ns/, /\.post-content/, /\.underline-hover/, /\.active/, /\.highlighter-rouge/, /\.highlight/]
            }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

gulp.task('sass:critical', function() {
  return gulp.src('css/main.css')
    // wrap with style tags

    .pipe(concat.header('<style>'))
    .pipe(concat.footer('</style>'))
    // convert it to an include file
    .pipe(rename({
        basename: 'criticalCSS',
        extname: '.html'
      }))
    // insert file in the includes folder
    .pipe(gulp.dest('_includes/'));
    });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('fonts/*.*', ['jekyll-rebuild']);
    gulp.watch(['*.html', '**/*.html', '**/*.md', 'js/**/*.js', 'images/*', '_posts/*','_projects/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);



gulp.task("deploy", ["jekyll-build"], function () {
    return gulp.src("./_site/**/*")
        .pipe(deploy());
});
