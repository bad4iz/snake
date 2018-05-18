const webpack = require('webpack');
const Uglify = require("uglifyjs-webpack-plugin");

module.exports = () => {
    return {
        plugins: [
            new Uglify({
                uglifyOptions: {
                    ie8: false,
                    ecma: 6,
                    // compress: { ...options },
                    warnings: false
            
                }
            })
        ]
    };
};