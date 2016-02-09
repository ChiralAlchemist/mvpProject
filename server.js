var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var bluebird = require('bluebird');
var util = require('./helpers/utility.js');

var riotApiKey = 'ff62241d-f02d-443b-8309-c4b10a4bc446';

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
  console.log('sent a get request to /')
  res.render('index'); 
  //res.send('helloWorld')
});

app.post('/', function(req, res){
 //console.log(req.body);
  var sentInGameName = req.body.inGameName;
  var makeUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+sentInGameName+"?api_key="+riotApiKey;
  util.getPlayerIdAndIcon(sentInGameName,function(riotRes){
    console.log(riotRes);
  });
  // request(makeUrl, function(err , riotRes , body){
  //   if(err){
  //     res.send(err);
  //   }
  //   //console.log(riotRes);
  //   console.log(body);
  // });

  res.send("heroku")
});

////////////
console.log("Sever now listening on port " + port);

app.listen(port);

//heroku stuff
//https://salty-peak-44142.herokuapp.com/ | https://git.heroku.com/salty-peak-44142.git