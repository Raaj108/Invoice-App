var myApp = angular.module('invoiceApp', ['angularUtils.directives.dirPagination']);
myApp.controller('invoiceController', ['$scope', '$window', '$log', 'calculateGrandTotal', function ($scope, $window, $log, calculateGrandTotal) {
    $scope.customer = {
        customerName: ""
        , company: ""
        , address: ""
        , email: ""
        , phones: ""
    };
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
    $scope.products = [];
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
            $scope.serialNumbers = $scope.serialNumbers + 1;
            $log.info($scope.products);
            $scope.GrandTotal($scope.products);
            //reset all scope variables
            $scope.description = "";
            $scope.quantity = 0;
            $scope.rate = 0;
            $scope.totalPrice = 0;
        }
        //ramove a row
    $scope.removeRow = function (event, index) {
            var selectRemoveRow = angular.element(event.target).parent().parent();
            $scope.serialNumbers = $scope.serialNumbers - 1;
            $scope.products.splice(index, 1);
            $log.info($scope.products);
            $scope.GrandTotal($scope.products);
            angular.element(selectRemoveRow).remove();
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
        restrict: 'EA'
        , templateUrl: 'templates/_partial_customer_info.html'
    }
});
myApp.directive('addRow', function () {
    return {
        restrict: 'EA'
        , templateUrl: 'templates/_partial_addRow.html'
        , replace: true
    }
});
myApp.directive('invoiceTable', function () {
    return {
        restrict: 'EA'
        , templateUrl: 'templates/_partial_invoice_table.html'
        , replace: true
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