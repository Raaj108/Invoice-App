angular.module('invoiceApp').controller('invoiceController', ['$scope', '$window', '$log', 'calculateGrandTotal', 'generateInvoiceJson', function ($scope, $window, $log, calculateGrandTotal, generateInvoiceJson) {
  $scope.today = new Date();

  $scope.reverse = true;
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
    totalPrice: 0,
  }];

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

  //calcutale Total price
  $scope.calculateTotal = function () {
      $scope.totalPrice = parseFloat($scope.quantity) * parseFloat($scope.rate);
    }
    //calculate grand total price
  $scope.GrandTotal = function (products) {
    $scope.grandTotalPrice = calculateGrandTotal.getGrandTotal(products);
  }

  //add a new row
  $scope.addRow = function (event) {
    event.preventDefault();
    $scope.products.push({
      serialNumbers: $scope.serialNumbers,
      description: $scope.description,
      quantity: $scope.quantity,
      rate: $scope.rate,
      totalPrice: $scope.totalPrice
    });
    $scope.serialNumbers = $scope.serialNumbers + 1;
    $scope.resetValues();
    angular.element("input[id='addDescription']").focus();
  }

  //ramove a row
  $scope.removeRow = function (event, index) {
    event.preventDefault();
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
    $scope.resetValues();
  }

  $scope.resetValues = function () {
    $scope.totalPrice = 0;
    $scope.description = "";
    $scope.quantity = 0;
    $scope.rate = 0;
    $scope.GrandTotal($scope.products);
  }

  $scope.generateJson = function (invoiceFormObj, event) {
    $scope.formData = generateInvoiceJson.getInvoiceJson(invoiceFormObj, event);
    $log.info($scope.formData);
  }
}]);