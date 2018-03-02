let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.options({ imgLoaderOptions: { enabled: false }})
    .js('src/Pomodoro.js', 'dist')    
    .sass('src/sass/app.scss','dist/css')
    .setPublicPath('dist');