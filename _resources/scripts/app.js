var myApp = angular.module('invoiceApp', []);
myApp.controller('invoiceController', ['$scope', '$window', '$log', function ($scope, $window, $log) {

  $scope.today = new Date();


  $scope.serialNumbers = 1;
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

  //calcutale Total price
  var quantity = Number($scope.customer.products.quantity || 0);
  var rate = Number($scope.customer.products.rate || 0);
  $scope.AddNumbers = function (customer) {
    $scope.totalPrice = quantity + rate;
  }

  //add a new row
  $scope.addRow = function (customer) {
    $scope.customer.products.push({
      'serialNumbers': $scope.serialNumbers,
      'description': '',
      'quantity': quantity,
      'rate': rate,
      'totalPrice': $scope.totalPrice,
    });
    $scope.serialNumbers++
      console.log($scope.customer.products);
  }

  $scope.removeRow = function (event) {

    var selectRemoveRow = angular.element(event.target).parent().parent();
    var removeSerialNumber = angular.element(selectRemoveRow).find('input[id="serialNumber"]').val();

    angular.forEach($scope.customer.products, function (value, key) {
      if ($scope.customer.products[key].serialNumbers == removeSerialNumber) {
        console.log(key);
      }

    });
    angular.element(selectRemoveRow).remove()
    console.log($scope.customer.products);
  }
}]);