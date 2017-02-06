var myApp = angular.module('invoiceApp', []);
myApp.controller('invoiceController', ['$scope', '$window', '$log', function ($scope, $window, $log) {
    $scope.today = new Date();
    $scope.serialNumbers = 1;
    $scope.customer = {
        customerName: ""
        , company: ""
        , address: ""
        , email: ""
        , phones: ""
    };
    $scope.products = [{
        serialNumbers: 0
        , description: ""
        , quantity: 0
        , rate: 0
        , totalPrice: 0
    }];
    $scope.totalPrice = 0;
    $scope.serialNumbers = 1;
    $scope.description = "";
    $scope.quantity = 0;
    $scope.rate = 0;
    //calcutale Total price
    $scope.calculateTotal = function () {
            $scope.totalPrice = parseFloat($scope.quantity) * parseFloat($scope.rate);
        }
        //add a new row
    $scope.addRow = function (product) {
        $scope.products.push({
            serialNumbers: $scope.serialNumbers
            , description: $scope.description
            , quantity: $scope.quantity
            , rate: $scope.rate
            , totalPrice: $scope.totalPrice
        });
        $scope.serialNumbers++;
        $scope.totalPrice = 0;
        $scope.description = "";
        $scope.quantity = 0;
        $scope.rate = 0;
        $log.info($scope.products);
    }
    $scope.removeRow = function (event) {
        var selectRemoveRow = angular.element(event.target).parent().parent();
        var removeSerialNumber = angular.element(selectRemoveRow).find('td#serialNumber').val();
        angular.forEach($scope.products, function (value, key) {
            if ($scope.products[key].serialNumbers == removeSerialNumber) {
                $scope.products.splice(key, 1);
            }
        });
        angular.element(selectRemoveRow).remove();
        $scope.serialNumbers--;
        $scope.totalPrice = 0;
        $scope.description = "";
        $scope.quantity = 0;
        $scope.rate = 0;
        $log.info($scope.products);
    }
}]);