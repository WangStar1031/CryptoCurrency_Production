/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('marketTableCtrl', marketTableCtrl);
  /** @ngInject */
  function marketTableCtrl($scope, baConfig, colorHelper, pagesService) {
    $scope.service = pagesService;
    $scope.currency_type = 0;
    $scope.transparent = baConfig.theme.blur;
    var dashboardColors = baConfig.colors.dashboard;
    $scope.strFilter = "";
    $scope.lstCurrencies = [];
    $scope.currency_type_str = '';
    $scope.lstCurrencyValues = [];
    $scope.curCurrencyList = [];
    $scope.onCryptoClick = function(curRecord){
      $scope.service.setChartDataType($scope.lstCurrencies[$scope.currency_type], curRecord.coin);
    }
    $scope.setCurrencyType = function(_nType){
      $scope.currency_type = _nType;
      if( _nType < $scope.lstCurrencies.length){
        $scope.currency_type_str = $scope.lstCurrencies[_nType];
      }
      $scope.service.setCurrencyType(_nType);
    }
    $scope.$watch('service.getCurrencyListData()', function(_newsData){
      $scope.lstCurrencies = _newsData;
      $scope.setCurrencyType(0);
    });
    $scope.$watch('service.getCurrentCurrency()', function(_newsData){
      $scope.curCurrencyList = _newsData;
    });
  }
})();