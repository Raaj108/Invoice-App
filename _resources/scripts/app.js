var myApp = angular.module('invoiceApp', []);

<<<<<<< HEAD
myApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
=======
app.controller('invoiceController', ['$scope', function ($scope) {
  $scope.customer = {
    customerName: "",
    company: "",
    address: "",
    email: "",
    phones: ""
  };
>>>>>>> ef07978db07f8b400f23851852a7d8a4121c77cd
}]);