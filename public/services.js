

angular.module('lolStats',[])
.controller('mainController', function($scope,$http){
  $scope.inGameName = '';
  $scope.season = 'SEASON2016';
  $scope.noSummonerFound = '';

  $scope.champList = [];
  var sendToSever= function(inGameName,season){
    $http({
      method: "POST",
      url: '/',
      data : {inGameName: inGameName, season: season}
    }).then( function(res){
        console.log('was successful');
        console.log(res);
        if(res.data.id!=='not found'){
          $scope.champList = res.data;
          $scope.noSummonerFound = '';
        } else {
          $scope.noSummonerFound = "Could not find that Summoner. Try again.";
        }
    }, function (err){
      console.log(err)
    });
    console.log('attempted to send ign');
  };

  var makeImageUrl = function (champName){
    if(champName){
      var template2 = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+champName+'_0.jpg';
      var template = 'http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/'+champName+'.png';
      return template;
    }
  };

  $scope.sendIGN= function(){ 
    sendToSever($scope.inGameName,$scope.season);
  }
  $scope.makeImageUrl= makeImageUrl;
})


.factory('connectServer', function($http){

  
});