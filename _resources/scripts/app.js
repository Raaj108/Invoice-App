var myApp = angular.module('invoiceApp', []);
myApp.controller('invoiceController', ['$scope', function ($scope) {
  $scope.customer = {
    customerName: "",
    company: "",
    address: "",
    email: "",
    phones: "",
    products: [{
      serialNumbers: 0,
      description: "",
      quantity: 0,
      rate: 0,
      totalPrice: 0
    }]
  };

  $scope.serialNumbers = 1;
  $scope.description = "";
  $scope.quantity = 0;
  $scope.rate = 0.00;
  $scope.totalPrice = 0.00;

  $scope.addRow = function () {

    $scope.customer.products.push({
      'serialNumbers': $scope.serialNumbers,
      'description': $scope.description,
      'quantity': $scope.quantity,
      'rate': $scope.rate,
      'totalPrice': $scope.totalPrice,
    });

    $scope.serialNumbers++;

    console.log($scope.customer.products);

  }

  $scope.greaterThan = function (prop, val) {
    return function (item) {
      return item[prop] > val;
    }
  };

  $scope.today = new Date();
  console.log($scope.today);
}]);