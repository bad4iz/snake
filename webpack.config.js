const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');

const uglifyJS = require('./webpack/js.uglify');

const babel = require('./webpack/babel');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

process.traceDeprecation = true;

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/main.js',
        },
        output: {
            library: "snake",
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
            }),

        ],
    },
    babel(),    
]);


module.exports = (env) => {
    if (env === 'production') {
        return merge([
            common,
            uglifyJS(),
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            {
                devtool: 'source-map'
            },

            devserver(),
        ])
    }
};