(function () {
  var valentine = angular.module('valentine', []);
  valentineGiftsController = valentine.controller('valentineGiftsController', function ($scope, $http) {

    var tableUpdate = function () {
        $http.get('https://valentine-gift.herokuapp.com/users/gifts').success(function (data) {
        $scope.gifts = data;
        console.log($scope.gifts);  
           
      }).error(function () {
        console.log('Error occured');
      });
    }

    tableUpdate();

    $scope.hideEditForm = true;

    $scope.edit = function (id, newName, newDescription, newPrice) {
      $scope.newName = newName;
      $scope.newDescription = newDescription;
      $scope.newPrice = newPrice;
      $scope.hideEditForm = false; 
      $scope.id = id;     
    }

    $scope.editGift = function (id) {      
      $http({
        method  : 'PUT',
        url     : 'https://valentine-gift.herokuapp.com/users/gifts/' + $scope.id,
        data    : $.param({name: $scope.newName, description: $scope.newDescription, price: $scope.newPrice}),  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
       }
      ).success(function () {
        console.log('Item edited'); 
        $scope.hideEditForm = true; 
        tableUpdate();       
      })
      .error(function () {
        console.log('Error occured');
      });
    }; 

    $scope.addGift = function () {
      
      $http({
        method  : 'POST',
        url     : 'https://valentine-gift.herokuapp.com/users/gifts',
        data    : $.param({name: $scope.name, description: $scope.description, price: $scope.price}),  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
       }
      ).success(function () {
        console.log('Item added');
        $scope.name = '';
        $scope.description = '';
        $scope.price = '';
        tableUpdate();

      })
      .error(function () {
        console.log('Error occured');
      });
    };

    $scope.cancel = function() {
      $scope.hideEditForm = true;
      tableUpdate();
    }

  });





}());


 