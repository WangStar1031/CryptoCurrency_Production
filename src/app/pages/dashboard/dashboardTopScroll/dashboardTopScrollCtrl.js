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
    $scope.currencyList = [];
    $scope.$watch('service.getCurrentCurrency()', function(_newsData){
      var arrBuf = [];
      while( arrBuf.length < 20){
        for( var i = 0; i < _newsData.length; i++){
          var ele = {"coin": _newsData[i].coin, "price": _newsData[i].price};
          arrBuf.push(ele);
        }
      }

      $scope.currencyForMarquee = arrBuf;
      // $scope.makeMarqueeString();
    });
    $scope.makeMarqueeString = function(){
      $scope.MainCurrencyPrice = "";
      if(!$scope.currencyForMarquee)return;
      for( var i = 0; i < $scope.currencyForMarquee.length; i++){
        $scope.MainCurrencyPrice += $scope.currencyForMarquee[i].coin + ": " + $scope.currencyForMarquee[i].price + " ";
      }
    }
    $scope.$watch('service.getCurrencyType()', function(_newsData){
      console.log(_newsData);
      $scope.mainCurrencyType = _newsData;
      if( $scope.currencyList && $scope.currencyList.length != 0){
        $scope.MainCurrency = $scope.currencyList[_newsData] + " : ";
      }
      // $scope.makeMarqueeString();
    });
    $scope.$watch('service.getCurrencyListData()', function(_newsData){
      $scope.currencyList = _newsData;
    })
  }
})();