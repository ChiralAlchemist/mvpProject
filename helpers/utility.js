var request = require('request');

var riotApiKey = 'ff62241d-f02d-443b-8309-c4b10a4bc446';

exports.getPlayerIdAndIcon = function (sentInGameName, callback){
  var makeUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+sentInGameName+"?api_key="+riotApiKey;

  request(makeUrl, function(err , riotRes , body){
    if(err){
      res.send(err);
    }
    //console.log(riotRes);
    callback(body);
  });
};

