const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        background: path.join(__dirname, 'src', 'background.ts'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    devtool: false,
    plugins: [
        new CopyWebpackPlugin({patterns: [
            {context: 'src', from: '*.json', to: '.'},
            {context: 'src', from: '*.png', to: '.'},
        ]}),
    ],
};
