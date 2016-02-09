

angular.module('lolStats',[])
.controller('mainController', function($scope,$http){
  $scope.inGameName = '';
  
  $scope.champList = [];
  var sendToSever= function(inGameName){
    $http({
      method: "POST",
      url: 'http://localhost:3000/',
      data : {inGameName: inGameName}
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
    var template = 'http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/'+champName+'.png';
    return template;
  };

  $scope.sendIGN= function(){ 
    sendToSever($scope.inGameName);
  }
  $scope.makeImageUrl= makeImageUrl;
})


.factory('connectServer', function($http){

  
});