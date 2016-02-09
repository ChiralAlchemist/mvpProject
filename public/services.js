

angular.module('lolStats',[])
.controller('mainController', function($scope,$http){
  $scope.inGameName = '';
  $scope.season = 2016;


  $scope.champList = [];
  var sendToSever= function(inGameName,season){
    $http({
      method: "POST",
      url: 'http://localhost:3000/',
      data : {inGameName: inGameName, season: season}
    }).then( function(res){
      console.log('was successful');
      console.log(res);
       $scope.champList = res.data;
    }, function (err){
      console.log(err)
    });
    console.log('attempted to send ign');
  };

  var makeImageUrl = function (champName){
    if(champName){
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