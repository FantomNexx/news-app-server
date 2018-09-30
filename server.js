let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');
let cors = require('cors');// to handle cross domain requests

let config = require('./config');

let app = express();
app.use(cors({origin: 'http://localhost:4200'}));

const MongooseConnectHandler = function (err) {
    if (err) {
        console.log();
    } else {
        console.log('connected to db');
    }
};

mongoose.connect(config.database, {useNewUrlParser: true}, MongooseConnectHandler);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

let api = require('./app/routes/api')(app, express);
app.use('/api', api);


// allows handling cross origin requests
/*
app.use(function (req, res, next) {

    console.log('request!');

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});
*/

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});


app.listen(config.port, function (err) {
    if (err) {
        console.log();
    } else {
        console.log('listening port ', config.port);
    }
});
