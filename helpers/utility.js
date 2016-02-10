var request = require('request');
var championKeys = require('./championKeys.js')
var riotApiKey = 'ff62241d-f02d-443b-8309-c4b10a4bc446';

exports.getPlayerIdAndIcon = function (sentInGameName, idCallback){
  var makeUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+sentInGameName+"?api_key="+riotApiKey;
  var sentInGameName = sentInGameName.toLowerCase();

    request(makeUrl, function(err , riotRes , body){
      var unpack = JSON.parse(body);
      //console.log(unpack);
      if(unpack.status){
        return idCallback({id:'not found'});
      }
      else{
      
      var nameAndId = {id: unpack[sentInGameName].id, profileIconId: unpack[sentInGameName].profileIconId}
      //var //console.log(riotRes);
      idCallback(nameAndId);
      }
    });
  };
exports.checkMatchData= function (sentInGameName,matchCallback){
  exports.getPlayerIdAndIcon(sentInGameName, function(nameAndId){
    var matchUrl = 'https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/'+ nameAndId.id +'?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446'
    request(matchUrl, function(err, res, matchData){
      pMatchData = JSON.parse(matchData);
      console.log(pMatchData);
    })

  });
  
};

exports.getPlayerStats = function (sentInGameName, season, statCallback){

  exports.getPlayerIdAndIcon(sentInGameName, function(nameAndId){
    console.log("name and id is ",nameAndId);
    if(nameAndId.id === 'not found'){
      return statCallback(nameAndId)
    }
    var gameId = nameAndId.id;
      

    var playerStatUrl = 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'+gameId+'/ranked?season='+season+'&api_key=ff62241d-f02d-443b-8309-c4b10a4bc446';
    
    request(playerStatUrl,function (err, res, playerStats){
      var parsedPlayerStats = JSON.parse(playerStats);
      var mostPlayed = [];
      //var top3 = parsedPlayerStats.champions.slice(parsedPlayerStats.champions.length-3);
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