//Directives
angular.module('invoiceApp')
.directive('navigationBar', function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/_partial_navbar.html'
    }
  })
  .directive('customerInfo', function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/_partial_customer_info.html'
    }
  })
  .directive('addRow', function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/_partial_addRow.html',
      replace: true
    }
  })
  .directive('tools', function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/_partial_tools.html',
      replace: true
    }
  })
  .directive('invoiceTable', function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/_partial_invoice_table.html',
      replace: true
    }
  });