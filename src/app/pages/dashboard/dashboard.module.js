/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [
      'BlurAdmin.pages.dashboard.techanChart'])
      .config(routeConfig)
      .controller('dashboardCtrl', dashboardCtrl);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'Cryptocurrency Price',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }
  function dashboardCtrl($scope, $interval, pagesService){
    $scope.timePeriod = "5m";
    $scope.service = pagesService;
    $scope.timePeriodClicked = function(strPeriod){
      $scope.timePeriod = strPeriod;
      $scope.service.setTimeInterval($scope.timePeriod);
    }
    pagesService.setTimeInterval($scope.timePeriod);
    $interval(function(){
      $scope.service.getServices();
    }, 1000 * 60 * 5);
    $scope.service.getServices();
  }

})();
