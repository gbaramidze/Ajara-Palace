const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = (env,args) => {
    const isProduction = args.mode === 'production';
    return {
        stats: 'errors-only',
        entry: [ "@babel/polyfill", "./main.js"],
        output: {
            publicPath: "/",
            path: path.join(__dirname, "/dist"),
            filename: "[name]-[hash].js",
            chunkFilename: '[name]-[hash].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    use: {
                        loader: "babel-loader",
                        query: {compact: false}
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: { importLoaders: 1 },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer')
                                    ],
                                },
                            },
                        },
                    ]
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                                importLoaders: 2,
                                localIdentName: '[local]'
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer')
                                    ],
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                modules: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/images/'
                            }
                        }
                    ]
                },
                {
                    type: 'javascript/auto',
                    test: /\.json$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }]
                }
                ,
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                }
            ]
        },
        devServer: {
            contentBase: './',
            compress: true,
            port: 3001,
            historyApiFallback: true,
            before: function(app, server, compiler) {
                app.get('/service-worker', function(req, res) {
                    res.json({ custom: 'response' });
                });
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name]-[hash].css',
            }),

            new CopyPlugin([
                {
                    from: 'assets/images/',
                    to: 'assets/images/',
                },
                {
                    from: 'assets/icons/',
                    to: 'assets/icons/',
                },
                {
                    from: 'assets/manifest.json',
                    to: 'assets/manifest.json',
                }
            ]),
          new RemovePlugin({
            before: {
              include: [
                './dist'
              ]
            }
          })
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css|.scss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    commons: {
                        test: /Views|\/components(Counter|Menu|MenuPicker|Table|TopBar)/,
                        enforce: true,
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'vendor',
                        enforce: true,
                        chunks: 'all',
                    },
                }
            }
        }
    }
};
