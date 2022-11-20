// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: {
        index: './src/index.ts',
        login: './src/login.ts',
        order_list: './src/order_list.ts',
        transaction: './src/transaction.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        // host: 'localhost',
        host: '0.0.0.0',
        // allowedHosts: 'all',
        port: 8000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'pages/index.html',
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: 'pages/login.html',
            filename: 'login.html',
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            template: 'pages/order_list.html',
            filename: 'order_list.html',
            chunks: ['order_list'],
        }),
        new HtmlWebpackPlugin({
            template: 'pages/transaction.html',
            filename: 'transaction.html',
            chunks: ['transaction'],
        }),
        new CopyPlugin({
            patterns: [
                // { from: 'public', to: './' },
                { from: 'pages/styles', to: 'styles' },
            ],
            options: {
                concurrency: 100,
            },
        }),


        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

        config.plugins.push(new MiniCssExtractPlugin());


    } else {
        config.mode = 'development';
    }
    return config;
};
