/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [
      'BlurAdmin.pages.dashboard.techanChart'])
      .config(routeConfig)
      .service('dashboardService', dashboardService)
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
  function dashboardCtrl($scope, dashboardService){
    $scope.timePeriod = "5m";
    $scope.service = dashboardService;
    $scope.timePeriodClicked = function(strPeriod){
      $scope.timePeriod = strPeriod;
      $scope.service.setTimeInterval($scope.timePeriod);
    }
    dashboardService.setTimeInterval($scope.timePeriod);
  }
  function dashboardService($rootScope){
    this.rootScope = $rootScope;
    this.timeInterval = null;
    this.timePeriod = "";
    this.newsJournal = [];
    this.reddit = [];
    this.twitter = [];

    this.CurrencyBTC = [];
    this.CurrencyETH = [];
    this.CurrencyXMR = [];
    this.CurrencyUSDT = [];

    this.mainCurrencyType = 0;

    this.getTimeInterval = function(_timeInterval){
      var nInterval = this.timePeriod.substring(0, this.timePeriod.length - 1);
      var strInterval = this.timePeriod.substring( this.timePeriod.length - 1);
      var nTimes = 60;
      if( strInterval == 'h'){
        nTimes *= 60;
      }
      var retVal = parseInt(nInterval * 1 * nTimes);
      return retVal;
    }
    this.getServices = function(){
      this.getNewsJournal(this);
      this.getReddit(this);
      this.getTwitter(this);
      this.getBTC(this);
      this.getETH(this);
      this.getXMR(this);
      this.getUSDT(this);
    }
    this.applyDatas = function(){
      $rootScope.$apply();
    }
    ////////////////////////// Journal
    this.getNewsJournal = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getNewsJournal/" + _this.timePeriod,
          dataType: 'json',
          success: function(data){
            _this.newsJournal = data;
            _this.applyDatas();
          }
      });
    }
    this.getNewsJournalData = function(){
      return this.newsJournal;
    }

    ////////////////////////// Reddit
    this.getReddit = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getRedditFromTo/" + _this.timePeriod,
          dataType: 'json',
          success: function(data){
            _this.reddit = data;
            _this.applyDatas();
          }
      });
    }
    this.getRedditData = function(){
      return this.reddit;
    }
    ////////////////////////// Twitter
    this.getTwitter = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getGetTweetsFromTo/" + _this.timePeriod,
          dataType: 'json',
          success: function(data){
            _this.twitter = data;
            _this.applyDatas();
          }
      });
    }
    this.getTwitterData = function(){
      return this.twitter;
    }
    ////////////////////////// BTC
    this.getBTC = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/get_currency/BTC",
          dataType: 'json',
          success: function(data){
            _this.CurrencyBTC = data;
            _this.applyDatas();
          }
      });
    }
    this.getBTCData = function(){
      return this.CurrencyBTC;
    }
    ////////////////////////// ETH
    this.getETH = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/get_currency/ETH",
          dataType: 'json',
          success: function(data){
            _this.CurrencyETH = data;
            _this.applyDatas();
          }
      });
    }
    this.getETHData = function(){
      return this.CurrencyETH;
    }
    ////////////////////////// XMR
    this.getXMR = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/get_currency/XMR",
          dataType: 'json',
          success: function(data){
            _this.CurrencyXMR = data;
            _this.applyDatas();
          }
      });
    }
    this.getXMRData = function(){
      return this.CurrencyXMR;
    }
    ////////////////////////// USDT
    this.getUSDT = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/get_currency/USDT",
          dataType: 'json',
          success: function(data){
            _this.CurrencyUSDT = data;
            _this.applyDatas();
          }
      });
    }
    this.getUSDTData = function(){
      return this.CurrencyUSDT;
    }

    this.createTimeInterval = function(){
      this.getServices();
      this.timeInterval = setInterval( this.getServices(), 1000 * this.getTimeInterval());
    }
    this.setTimeInterval = function(_timeInterval){
      if( this.timeInterval != null){
        clearInterval(this.timeInterval);
      }
      this.timePeriod = _timeInterval;
      this.createTimeInterval();
    }
    this.setCurrencyType = function(_nType){
        this.mainCurrencyType = _nType;
    }
    this.getCurrencyType = function(){
      return this.mainCurrencyType;
    }

    
    this.mainType = "BTC";
    this.subType = "AMP";
    this.techanChartData = [];
    this.isChange = false;
    this.getTechanChartData = function(_this){
      // console.log("getTechanChartData");
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/chart/"+_this.mainType+"/"+_this.subType+"/12h",
          // url: "http://apps.icaroai.com/icaroai/rest/charting/chart/BTC/AMP/12h",
          dataType: 'json',
          success: function(data){
            // console.log(data);
            _this.techanChartData = data;
            _this.isChange = !_this.isChange;
            _this.rootScope.$apply();
          }
      });
    }
    this.getTechanEntry = function(){
      this.getTechanChartData(this);
    }
    this.getNotify = function(){
      return this.isChange;
    }
    this.getTechanData = function(){
      return this.techanChartData;
    }
    this.setChartDataType = function(_mainType, _subType){
      // console.log("setChartDataType");
      this.mainType = _mainType;
      this.subType = _subType;
      this.getTechanChartData(this);
    }
  }

})();
