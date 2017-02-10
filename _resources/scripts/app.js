var myApp = angular.module('invoiceApp', ['angularUtils.directives.dirPagination']);
myApp.controller('invoiceController', ['$scope', '$window', '$log', 'calculateGrandTotal', function ($scope, $window, $log, calculateGrandTotal) {

  $scope.today = new Date();

  $scope.sort = function (keyname) {
    $scope.sortKey = keyname; //set the sortKey to the param passed
    $scope.reverse = !$scope.reverse; //if true make it false and vice versa
  }

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
    $scope.serialNumbers = $scope.serialNumbers + 1;
    $scope.totalPrice = 0;
    $scope.description = "";
    $scope.quantity = 0;
    $scope.rate = 0;
    $log.info($scope.products);
    $scope.GrandTotal($scope.products);

  }

  //ramove a row
  $scope.removeRow = function (event, index) {
    var selectRemoveRow = angular.element(event.target).parent().parent();

    $scope.products.splice(index, 1);
    angular.element(selectRemoveRow).remove();
    $scope.serialNumbers = $scope.serialNumbers - 1;
    $scope.totalPrice = 0;
    $scope.description = "";
    $scope.quantity = 0;
    $scope.rate = 0;
    $log.info($scope.products);
    $scope.GrandTotal($scope.products);

  }

  //calculate grand total price
  $scope.GrandTotal = function (products) {
    $scope.grandTotalPrice = calculateGrandTotal.getGrandTotal(products);
  }


  //Print
  $scope.printData = function () {
    var divToPrint = document.getElementById("printTable");
    newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }
}]);


//Services/Factories

myApp.factory('calculateGrandTotal', function () {
  var grandTotal
  var calculateGrandTotal = function (products) {
    grandTotal = 0;
    angular.forEach(products, function (value, key) {
      grandTotal = grandTotal + products[key].totalPrice;
    });
  }
  return {
    getGrandTotal: function (products) {
      calculateGrandTotal(products);
      return grandTotal;
    }
  }
});

myApp.factory('addRow', function () {

});


//Filters
myApp.filter('titleCase', function () {
  return function (input) {
    input = input || '';
    return input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
});