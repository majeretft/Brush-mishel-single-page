const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const minifyCfg = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
};
const minify = isProd ? minifyCfg : false;

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'index.js')
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [{
                    loader: isProd
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run postcss actions
                    options: {
                        plugins: function () { // postcss plugins, can be exported to postcss.config.js
                            let p = [require('autoprefixer')];

                            if (isProd)
                                p.push(require('cssnano'));

                            return p;
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
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]',
                            outputPath: (path) => {
                                if (!path)
                                    throw new Error('[file-loader] Image path is not defined.')
                                return path.replace(/src\//, '');
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: true,
                                progressive: true,
                                quality: 85
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                enabled: true,
                                quality: '65-80',
                                speed: 4,
                                strip: true,
                            },
                            svgo: {
                                enabled: true,
                            },
                            gifsicle: {
                                enabled: false,
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
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].webp?[hash]',
                            outputPath: (path) => {
                                if (!path)
                                    throw new Error('[file-loader] Image path is not defined.')
                                return path.replace(/src\//, '').replace(/webp/, 'img');
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: { enabled: false },
                            optipng: { enabled: false },
                            pngquant: { enabled: false },
                            svgo: { enabled: false },
                            gifsicle: { enabled: false },
                            webp: {
                                quality: 85
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            hash: true,
            minify: minify
        }),
        new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    ],
}