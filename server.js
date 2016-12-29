var express = require('express'),
	path = require('path'),
	httpProxy = require('http-proxy'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
	app = express();

mongoose.connect('mongodb://localhost:27017/lootlist');

var proxy = httpProxy.createProxyServer(),
    app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3011;
var publicPath = path.join(__dirname, 'dist');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./server/api-routes')(app);

if (!isProduction) {
    var bundle = require('./server/bundler.js');
    bundle();

    app.all('/build/*', function(req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
}

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again');
    console.log(e);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function() {
    console.log('LootList is up on port ' + port);
});
