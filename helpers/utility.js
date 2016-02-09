var request = require('request');
var championKeys = require('./championKeys.js')
var riotApiKey = 'ff62241d-f02d-443b-8309-c4b10a4bc446';

exports.getPlayerIdAndIcon = function (sentInGameName, idCallback){
  var makeUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+sentInGameName+"?api_key="+riotApiKey;
  var sentInGameName = sentInGameName.toLowerCase();

    request(makeUrl, function(err , riotRes , body){
      if(err){
        res.send(err);
      }
      var unpack = JSON.parse(body);
      var nameAndId = {id: unpack[sentInGameName].id, profileIconId: unpack[sentInGameName].profileIconId}
      //var //console.log(riotRes);
      idCallback(nameAndId);
    });
  };

exports.getPlayerStats = function (sentInGameName,statCallback){

  exports.getPlayerIdAndIcon(sentInGameName, function(nameAndId){
    var gameId = nameAndId.id;
      

    var playerStatUrl = 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'+gameId+'/ranked?season=SEASON2015&api_key=ff62241d-f02d-443b-8309-c4b10a4bc446'
    
    request(playerStatUrl,function (err, res, playerStats){
      var parsedPlayerStats = JSON.parse(playerStats);
      var mostPlayed = [];
      var top3 = parsedPlayerStats.champions.slice(parsedPlayerStats.champions.length-3);
      for(var i=0; i<parsedPlayerStats.champions.length; i++){

        var championObj = parsedPlayerStats.champions[i];
        //console.log(parsedPlayerStats.champions[i]);
        championObj.championName = championKeys.keys[championObj.id]
        mostPlayed.push(championObj);
      }
      statCallback(mostPlayed);
    });  
  });
}

var findMostPlayed = function(championObjList){
  //var 
}