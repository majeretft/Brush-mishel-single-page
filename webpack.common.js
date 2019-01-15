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
                include: /img/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]',
                            limit: 4096,
                            outputPath: (path) => {
                                if (!path)
                                    throw new Error('[url-loader] Image path is not defined.')
                                return path.replace(/src\//, '');
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                //quality: 65
                                quality: 10
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                //quality: '65-90',
                                quality: '10-20',
                                speed: 4
                            },
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg)$/,
                include: /webp/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].webp?[hash]',
                            limit: 4096,
                            outputPath: (path) => {
                                if (!path)
                                    throw new Error('[url-loader] Image path is not defined.')
                                return path.replace(/src\//, '').replace(/webp/, 'img');
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                //quality: 65
                                quality: 25
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                //quality: '65-90',
                                quality: '20-30',
                                speed: 4
                            },
                            // the webp option will enable WEBP
                            webp: {
                                //quality: 75
                                quality: 25
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                include: /fonts/,
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