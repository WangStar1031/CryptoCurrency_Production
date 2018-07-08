/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('dashboardTopScrollCtrl', dashboardTopScrollCtrl);

  /** @ngInject */
  function dashboardTopScrollCtrl($scope, $timeout, baConfig, pagesService) {
    $scope.service = pagesService;
    $scope.MainCurrency = "BTC : ";
    $scope.MainCurrencyPrice = "";
    $scope.mainCurrencyType = 0;
    $scope.currencyForMarquee = [];
    $scope.$watch('service.getCurrentCurrency()', function(_newsData){
      $scope.currencyForMarquee = _newsData;
      $scope.makeMarqueeString();
    });
    $scope.makeMarqueeString = function(){
      $scope.MainCurrencyPrice = "";
      if(!$scope.currencyForMarquee)return;
      for( var i = 0; i < $scope.currencyForMarquee.length; i++){
        $scope.MainCurrencyPrice += $scope.currencyForMarquee[i].coin + ": " + $scope.currencyForMarquee[i].price + " ";
      }
    }
    $scope.$watch('service.getCurrencyType()', function(_newsData){
      $scope.mainCurrencyType = _newsData;
      $scope.makeMarqueeString();
    })
  }
})();