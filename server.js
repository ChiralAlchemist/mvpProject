var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;


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

////////////
console.log("Sever now listening on port " + port);

app.listen(port);