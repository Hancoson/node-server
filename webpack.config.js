var path    = require('path');
var webpack = require('webpack');

var lib_dir            = __dirname + '/node_modules';
var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin"); //将多个打包后的资源中的公共部分打包成单独的文件
var ProvidePlugin      = require("./node_modules/webpack/lib/ProvidePlugin"); //

module.exports = {
    entry  : {
        index: __dirname + '/src/scripts/index.js',
        about: __dirname + '/src/scripts/about.js'
    },
    output : {
        path    : __dirname + 'www/src/js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js'],
        alias     : {
            jquery: lib_dir + "/jquery/dist/jquery.js"
        }
    },
    module : {
        loaders: [
            {
                loader: 'babel-loader',
                test  : path.join(__dirname, 'src/scripts'),
                query : {
                    presets: 'es2015',
                }
            }
        ]
    },

    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new ProvidePlugin({
            $              : "jquery",
            jQuery         : "jquery",
            "window.jQuery": "jquery"
        }),
        new CommonsChunkPlugin("lib/lib-pages.js", 2) //文件被引用两次就打包到common.js文件中
    ],
    stats  : {
        // Nice colored output
        colors: true
    }
    ,
// Create Sourcemaps for the bundle
    devtool: 'source-map',
}
;
