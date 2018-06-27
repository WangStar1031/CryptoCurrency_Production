/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('dashboardTopScrollCtrl', dashboardTopScrollCtrl);

  /** @ngInject */
  function dashboardTopScrollCtrl($scope, $timeout, baConfig, dashboardService) {
    $scope.service = dashboardService;
    $scope.MainCurrency = "BTC : ";
    $scope.MainCurrencyPrice = "";
    $scope.mainCurrencyType = 0;
    $scope.CurrencyBTC = [];
    $scope.CurrencyETH = [];
    $scope.CurrencyXMR = [];
    $scope.CurrencyUSDT = [];
    $scope.currencyForMarquee = [];
    $scope.$watch('service.getBTCData()', function(_newsData){
      $scope.CurrencyBTC = _newsData;
      $scope.makeMarqueeString();
    });
    $scope.$watch('service.getETHData()', function(_newsData){
      $scope.CurrencyETH = _newsData;
    });
    $scope.$watch('service.getXMRData()', function(_newsData){
      $scope.CurrencyXMR = _newsData;
    });
    $scope.$watch('service.getUSDTData()', function(_newsData){
      $scope.CurrencyUSDT = _newsData;
    });
    $scope.makeMarqueeString = function(){
      $scope.currencyForMarquee = [];
      switch($scope.mainCurrencyType){
        case 0: $scope.currencyForMarquee = $scope.CurrencyBTC; $scope.MainCurrency = "BTC : "; break;
        case 1: $scope.currencyForMarquee = $scope.CurrencyETH; $scope.MainCurrency = "ETH : "; break;
        case 2: $scope.currencyForMarquee = $scope.CurrencyXMR; $scope.MainCurrency = "XMR : "; break;
        case 3: $scope.currencyForMarquee = $scope.CurrencyUSDT; $scope.MainCurrency = "USDT : "; break;
      }
      $scope.MainCurrencyPrice = "";
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