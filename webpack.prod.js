process.env.NODE_ENV = 'production';

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'src/.htaccess', to: '[name].[ext]' },
            { from: 'src/favicon.ico', to: '[name].[ext]' },
            { from: 'src/robots.txt', to: '[name].[ext]' },
            { from: 'src/sitemap.xml', to: '[name].[ext]' },
            { from: 'src/yandex_fce8ab34faa7237d.html', to: '[name].[ext]' },
        ]),
    ],
    output: {
        path: path.resolve(__dirname, 'dist')
    }
});