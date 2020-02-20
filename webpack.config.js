const fs = require('fs');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

module.exports = {
    mode: 'development',
    entry: {
        build: './src/main.js',
        style: './src/styles/index.scss'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new WebpackOnBuildPlugin(() => {
            fs.unlinkSync(path.resolve(__dirname, 'dist') + '\\style.js');
            fs.unlinkSync(path.resolve(__dirname, 'dist') + '\\build.css')
        })
    ]
};