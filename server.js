var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
//app.user(express.static(__dirname + '/views'));
app.set('views',__dirname + '/views');
app.set('view engine', 'jade')


console.log("Sever now listening on port " + port);


app.get('/', function (req , res){
  console.log('sent a get reqest to /')
  res.render('index', {test : 'hi'}); 
  //res.send('helloWorld')
});

app.listen(port);