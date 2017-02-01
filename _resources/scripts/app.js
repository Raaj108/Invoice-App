var myApp = angular.module('invoiceApp', []);
myApp.controller('invoiceController', ['$scope', function ($scope) {
    $scope.customer = {
        customerName: ""
        , company: ""
        , address: ""
        , email: ""
        , phones: ""
    };
    $scope.greaterThan = function (prop, val) {
        return function (item) {
            return item[prop] > val;
        }
    };
    $scope.products = {
        serialNumbers: 0
    };
    $scope.addRow = function () {
        $scope.products.serialNumbers++;
        console.log($scope.products.serialNumbers);
    };
    $scope.today = new Date();
    console.log($scope.today);
}]);