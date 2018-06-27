/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('marketTableCtrl', marketTableCtrl);

  /** @ngInject */
  function marketTableCtrl($scope, baConfig, colorHelper, dashboardService) {
    $scope.service = dashboardService;
    $scope.currency_type = 0;
    $scope.transparent = baConfig.theme.blur;
    var dashboardColors = baConfig.colors.dashboard;
    $scope.strFilter = "";
    $scope.CurrencyBTC = [];
    $scope.CurrencyETH = [];
    $scope.CurrencyXMR = [];
    $scope.CurrencyUSDT = [];
    $scope.$watch('service.getBTCData()', function(_newsData){
      $scope.CurrencyBTC = _newsData;
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
    $scope.onBTCClick = function(btcRecord){
      $scope.service.setChartDataType("BTC", btcRecord.coin);
    }
    $scope.onETHClick = function(ethRecord){
      $scope.service.setChartDataType("ETH", ethRecord.coin);
    }
    $scope.onXMRClick = function(xmrRecord){
      $scope.service.setChartDataType("XMR", xmrRecord.coin);
    }
    $scope.onUSDTClick = function(usdtRecord){
      $scope.service.setChartDataType("USDT", usdtRecord.coin);
    }
    $scope.setCurrencyType = function(_nType){
      $scope.currency_type = _nType;
      $scope.service.setCurrencyType(_nType);
    }
  }
})();