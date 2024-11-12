const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'], // Asegúrate de incluir .tsx
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@componentes': path.resolve(__dirname, './src/componentes'),
                //'@pages': path.resolve(__dirname, './src/pages'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@services': path.resolve(__dirname, './src/servicios'),
                '@utilidad': path.resolve(__dirname, './src/utilidad'),
                '@interfaces': path.resolve(__dirname, './src/interfaces'),
                '@context': path.resolve(__dirname, './src/context'),
                //'@styles': path.resolve(__dirname, './src/styles')
            },
            fallback: {
                "process": require.resolve("process/browser")
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // Para archivos .ts y .tsx
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/, // Para manejar archivos CSS
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
            // Agrega estos plugins
            new Dotenv({
                path: isProduction ? '.env.production' : '.env',
                systemvars: true,
                safe: true,
                defaults: false
            }),
        ],
        devServer: {
            static: './dist',
        },
    }
};
