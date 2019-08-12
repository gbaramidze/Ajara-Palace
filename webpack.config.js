const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env,args) => {
    const isProduction = args.mode === 'production';
    return {
        stats: 'errors-only',
        entry: {
            index: "./main.js",
        },
        output: {
            publicPath: "/",
            path: path.join(__dirname, "/dist"),
            filename: "[hash].js",
            chunkFilename: '[hash].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.(js|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader"
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
                            loader: "sass-loader",
                            options: {
                                modules: true
                            }
                        },
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
            port: 80,
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: '[hash].css',
                chunkFilename: '[id].css',
            }),

            new CopyPlugin([
                {
                    from: 'assets/images/',
                    to: 'assets/images/',
                },

            ])
        ]
    }
};
