var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
///template stuff

app.use(express.static(__dirname + '/public'));
app.set('views',__dirname + '/views');
app.set('view engine', 'jade')
//
// logger
app.use(morgan('dev'));

////
app.get('/', function (req , res){
  console.log('sent a get reqest to /')
  res.render('index'); 
  //res.send('helloWorld')
});

app.post('/', function(req, res){
  console.log(req.body);

  res.send("heroku")
});

////////////
console.log("Sever now listening on port " + port);

app.listen(port);

//heroku stuff
//https://salty-peak-44142.herokuapp.com/ | https://git.heroku.com/salty-peak-44142.git