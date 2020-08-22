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
        // exclude locale files in moment
        new CopyWebpackPlugin({
            patterns: [{from: 'src/manifest.json', to: '.'}],
        }),
    ],
};
