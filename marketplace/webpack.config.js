var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NODE_ENV = process.env.NODE_ENV || 'production';
var DEV = (NODE_ENV === 'development');
var PROD = (NODE_ENV === 'production');

var MOCK = JSON.parse(process.env.MOCK || 'false');

module.exports = {
    devtool: DEV ? 'eval-source-map' : "source-map",
    entry: {
        // entry points JS files that will be loaded

        view: path.join(__dirname,'src', 'marketplace', 'view.js'),
        configuration: path.join(__dirname,'src', 'marketplace', 'configuration.js')
    },

    output: {
        path:  path.join(__dirname,'tiles','marketplace','public','javascripts'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            __MOCK__: JSON.stringify(MOCK),
            'process.env':{
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.(jpg|png|gif)$/i,
                loader: 'url'
            },
            {
                test: /.css$/,
                loader: 'style!css'
            },
            {
              test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'base64-font-loader'
            }
          ]
    }
};
