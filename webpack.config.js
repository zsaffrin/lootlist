var Webpack = require('webpack'),
    path = require('path');

var sourcePath = path.join(__dirname, 'src', 'app.js'),
    clientPath = path.join(__dirname, 'dist');


var config = {
    devtool: 'eval',
    entry: { 
    	app: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080',
			sourcePath
	    ],
	    vendor: ['react', 'react-dom', 'react-router'] 
	},
    output: {
        path: clientPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },
    plugins: [
    	new Webpack.optimize.OccurrenceOrderPlugin(),
    	new Webpack.HotModuleReplacementPlugin(),
    	new Webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
	]
};

module.exports = config;
