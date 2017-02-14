var myApp = angular.module('invoiceApp', ['angularUtils.directives.dirPagination']);
myApp.controller('invoiceController', ['$scope', '$window', '$log', 'calculateGrandTotal', function ($scope, $window, $log, calculateGrandTotal) {
  $scope.today = new Date();
  $scope.reverse = true;
  $scope.sort = function (keyname) {
    $scope.sortKey = keyname; //set the sortKey to the param passed
    $scope.reverse = !$scope.reverse; //if true make it false and vice versa
  }
  $scope.serialNumbers = 1;
  $scope.description = "";
  $scope.quantity = 0;
  $scope.measurementUnit = ["Kg.", "Lbs.", "Units"];
  $scope.currencies = [{
    label: 'Indian Rupee',
    value: '\u20B9'
  }, {
    label: 'British Pound',
    value: '\u00A3',
  }, {
    label: 'US Dollar',
    value: '\u0024',
  }];

  $scope.productos = [{
    value: 'prod_1',
    label: 'Product 1'
  }, {
    value: 'prod_2',
    label: 'Product 2'
  }];


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
    totalPrice: 0,
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
      // $log.info($scope.products);
      $scope.GrandTotal($scope.products);
    }
    //ramove a row
  $scope.removeRow = function (event, index) {
      var tempProductArray = [];
      var selectRemoveRow = angular.element(event.target).parent("tr");
      $scope.products.splice(index, 1);
      angular.element(selectRemoveRow).remove();
      angular.forEach($scope.products, function (value, key) {
        tempProductArray.push({
          serialNumbers: key,
          description: $scope.products[key].description,
          quantity: $scope.products[key].quantity,
          rate: $scope.products[key].rate,
          totalPrice: $scope.products[key].totalPrice
        });
      });
      $scope.products.length = 0;
      $scope.products = tempProductArray.concat();
      $scope.serialNumbers = $scope.serialNumbers - 1;
      $scope.totalPrice = 0;
      $scope.grandTotalPrice = 0;
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
//Directives
myApp.directive('customerInfo', function () {
  return {
    restrict: 'EA',
    templateUrl: 'templates/_partial_customer_info.html'
  }
});
myApp.directive('addRow', function () {
  return {
    restrict: 'EA',
    templateUrl: 'templates/_partial_addRow.html',
    replace: true
  }
});
myApp.directive('tools', function () {
  return {
    restrict: 'EA',
    templateUrl: 'templates/_partial_tools.html',
    replace: true
  }
});
myApp.directive('invoiceTable', function () {
  return {
    restrict: 'EA',
    templateUrl: 'templates/_partial_invoice_table.html',
    replace: true
  }
});
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
//Filters
myApp.filter('titleCase', function () {
  return function (input) {
    input = input || '';
    return input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
});