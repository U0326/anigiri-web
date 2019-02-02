const path = require('path');

module.exports = (env, argv) => ({
    mode: 'development',
    entry: './src/main/js/index.js',
    module: {
        rules: [
            { test: /\.css$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?name=../font/[name].[ext]' },
            { test: /\.(jpg|png)$/, loaders: 'url-loader' },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    resolve: {
        alias: {
            config: argv.mode === 'development'
                    ? path.resolve (__dirname, 'src/main/js/config/config-development.js')
                    : path.resolve (__dirname, 'src/main/js/config/config-production.js')
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static/js')
    }
});
