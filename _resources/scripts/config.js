angular.module('invoiceApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: 'templates/_partial_main.html'
    })
    .state('/report', {
      url: '/report',
      templateUrl: 'templates/_partial_report.html'
    })
}]);