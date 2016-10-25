/**
 *   on 2016-09-05.
 */

var TILE_NAME = 'job-tile';

var git = require('git-rev-sync');
var exec = require('sync-exec');
var moment = require('moment');
var fs = require('fs');
var webpack = require('webpack');
var cmdArgs = require('minimist')(process.argv.slice(2));
var path = require('path');

var NODE_ENV = process.env.NODE_ENV || cmdArgs.NODE_ENV || 'production';
var DEV = NODE_ENV == 'development';
var PROD = NODE_ENV == 'production';

var buildDate = moment().format('YYYY-MM-DD HH:mm:ss ZZ');
var revision = git.long();
var branch = git.branch();

var gitUserName = exec('git config user.name').stdout.trim();
var gitUserEmail = exec('git config user.email').stdout.trim();
var gitFullStatus = exec('git status').stdout.trim();
var gitStatus = gitFullStatus.indexOf('nothing to commit') !== -1 ? 'OK' : "have changes :'(";


/*if (PROD && gitStatus !== 'OK') {

 console.error('=============================================');
 console.error('Commit git changes before production build!!!'.toUpperCase() );

 console.log(gitFullStatus);

 console.error('=============================================');

 process.exit(-1);
 }*/


module.exports = {
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.min.js', '.jsx']
    },

    entry: {
        view: path.join(__dirname, 'src', TILE_NAME, 'view.jsx'),
        configuration: path.join(__dirname, 'src', TILE_NAME, 'configuration.jsx')
    },

    output:{
        path: path.join(__dirname, 'tiles', TILE_NAME, 'public', 'javascripts'),
        filename: '[name].js'
    },

    externals: {
        "jive": "jive",
        "jive/gadgets": "gadgets",
        "jive/jquery":"jQuery",
        "jive/osapi":"osapi"
    },

    module:{
        loaders:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel?cacheDirectory'
            }, {
                test:/\.css$/,
                loader:'style!css?localIdentName=[name]-[local]--[hash:base64:5]'
            }, {
                test:/\.(jpg|jpeg|png|gif)$/i,
                loader:'url?name=/images/[name].[ext]&limit=' + (32 * 1024) // 32kb - data-url limit for IE
            }, {
                test:/\.(eot|woff|woff2|ttf)$/,
                loader:'file?name=fonts/[name].[ext]'
            }
        ]
    },

    plugins :[
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV: JSON.stringify(NODE_ENV)
            },

            __BUILD_DATE__: JSON.stringify(buildDate),
            __GIT_REVISION__: JSON.stringify(revision),
            __GIT_BRANCH__: JSON.stringify(branch),
            __GIT_USER_NAME__: JSON.stringify(gitUserName),
            __GIT_USER_EMAIL__: JSON.stringify(gitUserEmail),
            __GIT_STATUS__: JSON.stringify(gitStatus)
        }),

        new webpack.optimize.UglifyJsPlugin({
            
            minimize: PROD,
            mangle: PROD,
            comments: DEV,
            compress:{
                warnings:false
            }
        })
    ]
};
