const fs = require('fs');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageSpritePlugin = require('image-sprite-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

module.exports = {
    mode: 'development',
    // devtool: "sourcemap",
    // debug: true,
    entry: {
        build: './src/main.js'
    },
    output: {
        path: __dirname,
        filename: 'dist/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: 'dist/temp/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'dist/css/[name].css',
        }),
        new ImageSpritePlugin({
            commentOrigin: false,
            compress: true,
            extensions: ['gif', 'svg', 'jpg', 'png'],
            indent: '',
            log: true,
            outputFilename: 'dist/img/sprite.png',
            padding: 10,
        }),
        new WebpackOnBuildPlugin(() => {
            fs.rmdirSync(path.resolve(__dirname, 'dist') + '\\temp', { recursive: true });
        })
    ]
};