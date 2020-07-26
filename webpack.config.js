const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
      app: './src/app.js',
      print: './src/print.js',  
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: './assets/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
          }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), 
        publicPath: '/assets/',
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
        },
    },
    module: {
        rules: [
            {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
        },
        {
            test: /\.(.png|svg|jpg|gif)$/,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                        disable: false,
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                    },
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader',
            ],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        ],
    },
};