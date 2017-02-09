var myApp = angular.module('invoiceApp', []);
myApp.controller('invoiceController', ['$scope', '$window', '$log', function ($scope, $window, $log) {

  $scope.today = new Date();
  $scope.curPage = 0;
  $scope.pageSize = 5;
  $scope.productListLength = 1;


  $scope.serialNumbers = 1;
  $scope.description = "";
  $scope.quantity = 0;
  $scope.rate = 0;
  $scope.totalPrice = 0;
  $scope.grandTotalPrice = 0;
  $scope.customer = {
    customerName: "",
    company: "",
    address: "",
    email: "",
    phones: ""
  };
  $scope.products = [{
    serialNumbers: 0,
    description: "",
    quantity: 0,
    rate: 0,
    totalPrice: 0
    }];


  //calcutale Total price
  $scope.calculateTotal = function () {
    $scope.totalPrice = parseFloat($scope.quantity) * parseFloat($scope.rate);
  }

  //add a new row
  $scope.addRow = function (product) {
    $scope.products.push({
      serialNumbers: $scope.serialNumbers,
      description: $scope.description,
      quantity: $scope.quantity,
      rate: $scope.rate,
      totalPrice: $scope.totalPrice
    });
    $scope.serialNumbers++;
    $scope.totalPrice = 0;
    $scope.description = "";
    $scope.quantity = 0;
    $scope.rate = 0;
    $log.info($scope.products);
    $scope.calculateGrandTotal($scope.products);  
    $scope.productListLength++;
  }

  //ramove a row
  $scope.removeRow = function (event, index) {
    var selectRemoveRow = angular.element(event.target).parent().parent();

    $scope.products.splice(index, 1);
    angular.element(selectRemoveRow).remove();
    $scope.serialNumbers--;
    $scope.totalPrice = 0;
    $scope.description = "";
    $scope.quantity = 0;
    $scope.rate = 0;
    $log.info($scope.products);
    $scope.calculateGrandTotal($scope.products);
    $scope.productListLength--;
  }

  //calculate grand total price
  $scope.calculateGrandTotal = function (products) {
    $scope.grandTotal = 0;
    angular.forEach(products, function (value, key) {
      $scope.grandTotal = $scope.grandTotal + products[key].totalPrice;
    });
    $scope.grandTotalPrice = $scope.grandTotal;;
  }

  $scope.numberOfPages = function () {
    if ($scope.productListLength >= 5) {
      return Math.ceil($scope.productListLength / $scope.pageSize);
    } else {
      return 1;
    }
  };

  //Print
  $scope.printData = function () {
    var divToPrint = document.getElementById("printTable");
    newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }
}]);


myApp.factory('serviceId', function () {

});

myApp.filter('titleCase', function () {
  return function (input) {
    input = input || '';
    return input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
});


myApp.filter('pagination', function () {
  return function (input, start) {
    start = +start;
    return input.slice(start);
  };
});