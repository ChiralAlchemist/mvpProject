

angular.module('lolStats',[])
.controller('mainController', function($scope,$http){
  $scope.inGameName = '';
  

  var sendToSever= function(inGameName){
    $http({
      method: "POST",
      url: 'http://localhost:3000/',
      data : {inGameName: inGameName}
    }).then( function(res){
      console.log('was successful');
      console.log(res);
      return res.data;
    }, function (err){
      console.log(err)
    });
    console.log('attempted to send ign');
  };

  $scope.sendIGN= function(){ 
    return sendToSever($scope.inGameName);
  }
})

.factory('connectServer', function($http){

  
});