const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const DevMode = process.env.NODE_ENV === 'development';
const ProdMode = !DevMode;

console.log('DevelopmentMode: ', DevMode);
console.log('ProductionMode: ', ProdMode);

function optimization() {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (ProdMode) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
}

function fileName(extention) {
    if (DevMode){
        return `[name].${extention}`
    } else {
        return `[name].[hash].${extention}`
    }
}

// function addPlugin(newPlugin) {
//     const prodPlugin = [];
//
//     if (ProdMode && newPlugin) {
//         prodPlugin.push(newPlugin);
//     }
//
//     return prodPlugin;
// }

function cssLoaders(extra) {
    let currentMode = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: DevMode,
                reloadAll: true
            }
        },
        'css-loader',
    ];
    const productionMode = {loader: 'postcss-loader', options: {plugins: [new Autoprefixer()]}};
    if (ProdMode) {
        currentMode = [...currentMode, productionMode]
    }
    if (extra) {
        currentMode.push(extra)
    }

    return currentMode;
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    entry: {
        main: ['@babel/polyfill', './js/app.js'],
        analytics: './js/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: fileName('js')
    },
    // watch: false,
    // watchOptions: {
    //     aggregateTimeout: 100
    // },
    devtool: DevMode ? 'source-map' : '',
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: DevMode
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: ProdMode
            }
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
            filename: fileName('css')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')

            },
            {
                test:/\.(jpg|png|svg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                    loader: 'file-loader',
                    options: {
                        name: fileName('[ext]'),
                        outputPath: 'img'
                    }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'file-loader',
                    options: {
                        name: fileName('[ext]'),
                        outputPath: 'webfonts'
                    }
                },

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ],
    },
};

