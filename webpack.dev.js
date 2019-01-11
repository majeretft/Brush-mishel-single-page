process.env.NODE_ENV = 'development';

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval',
    plugins: [
        new CleanWebpackPlugin(['build'])
    ],
    output: {
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        contentBase: './build'
    },
});