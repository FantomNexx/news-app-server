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

let api_article = require('./app/routes/api_article')(app, express);
app.use('/api_article', api_article);

let api_article_source = require('./app/routes/api_article_source')(app, express);
app.use('/api_article_source', api_article_source);


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
