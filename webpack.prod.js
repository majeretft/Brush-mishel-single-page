process.env.NODE_ENV = 'production';

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        path: path.resolve(__dirname, 'dist')
    }
});