var myApp = angular.module('invoiceApp', []);

app.controller('invoiceController', ['$scope', function ($scope) {
  $scope.customer = {
    customerName: "",
    company: "",
    address: "",
    email: "",
    phones: ""
  };
}]);