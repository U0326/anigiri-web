const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static/js')
    },
    module: {
        rules: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?name=../font/[name].[ext]' },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    }
}
