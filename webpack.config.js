const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

const config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: [
                {
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve('eslint')
                    },
                    loader: require.resolve('eslint-loader')
                }
            ],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        {
            test: /\.css$/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            require('autoprefixer')({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9' // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009'
                            })
                        ]
                    }
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: 'true',
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        modules: 'true',
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    }
                }
            ]
        },
        {
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.scss$/, /\.css$/],
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]'
            }
        }
    ]
  },
  plugins: [htmlPlugin],
};

module.exports = config;
