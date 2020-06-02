const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');



const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };
    return config;
};



module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    entry: {
        main: './js/app.js',
        analytics: './js/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    // watch: false,
    // watchOptions: {
    //     aggregateTimeout: 100
    // },
    devtool: 'source-map',
    optimization: optimization(),
    devServer: {
        port: 4200
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebPackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon/*'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {loader: 'postcss-loader', options: {plugins: [Autoprefixer()]}},
                ]
            },
            {
                test:/\.(jpg|png|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],
    },
};

