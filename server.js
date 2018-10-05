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

// app.use(express.static(__dirname + '/public'));

let api = require('./app/routes/api')(app, express);
app.use('/api', api);


/*
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});
*/


app.listen(config.port, function (err) {
    if (err) {
        console.log();
    } else {
        console.log('listening port ', config.port);
    }
});
