const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/', // Importante para aplicaciones SPA
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@componentes': path.resolve(__dirname, './src/componentes'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@services': path.resolve(__dirname, './src/servicios'),
                '@utilidad': path.resolve(__dirname, './src/utilidad'),
                '@interfaces': path.resolve(__dirname, './src/interfaces'),
                '@context': path.resolve(__dirname, './src/context'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                //favicon: './public/favicon.ico', // Opcional
            }),
            new Dotenv({
                path: isProduction ? '.env.production' : '.env',
                systemvars: true, // Permite el uso de variables del sistema también
                safe: true,
                defaults: false,
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].[contenthash].css' : '[name].css',
            }),
        ],
        devServer: {
            static: './dist',
            historyApiFallback: true, // Importante para SPAs
            port: 8080,
            open: true,
            hot: true,
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        optimization: {
            ...(isProduction && {
                minimize: true,
                splitChunks: {
                    chunks: 'all',
                },
            }),
        },
    };
};