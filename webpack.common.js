const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'index.js')
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run postcss actions
                    options: {
                        plugins: function () { // postcss plugins, can be exported to postcss.config.js
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|jpg|svg)$/,
                exclude: /fonts/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]',
                            limit: 8192,
                            outputPath: (path) => {
                                if (!path) 
                                    throw new Error('[file-loader] Image path is not defined.')
                                return path.replace(/src\//, '');
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                exclude: /img/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: 'fonts/',
                            limit: 10240
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.html', hash: true }),
        new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    ],
}