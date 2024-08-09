const path = require('path');

module.exports = {
    entry: [
        './src/components/graph-component/graph.js',
        './src/components/render.js',
        './src/components/reminder-component/reminder.js',
        './src/constants/auth.js',
        './src/components/loader.js',
        './src/components/add-card-modal/add-card.js',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js', path: path.resolve(__dirname, 'dist'), publicPath: '/dist/'
    },
    mode: 'development',
    module: {
        rules: [
            {
            test: /\.js$/, exclude: /node_modules/, use: {
                loader: 'babel-loader', options: {
                    presets: ['@babel/preset-env'],
                },
            },
        },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/i,
                use: 'html-loader'
            }
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/src')
        }, compress: true, port: 9000, hot: true
    },
};
