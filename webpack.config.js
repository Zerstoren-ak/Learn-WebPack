const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './js/app.js',
        analytics: './js/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    watch: false,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'source-map',
    plugins: [new HtmlWebpackPlugin({
        template: `./index.html`
    }),
        new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.(jpg|png|svg)$/,
                use: ['file-loader']
            }
        ],
    },
};
