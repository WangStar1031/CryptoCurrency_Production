/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.charts',
    'ui.select',
    'ngSanitize',
  ])
      .config(routeConfig)
      .service('pagesService', pagesService);

      
  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  }
  function pagesService($rootScope){
    var curTime = new Date();
    var year = curTime.getFullYear();
    var month = curTime.getMonth() + 1 > 9 ? curTime.getMonth() + 1 : '0' + (curTime.getMonth() + 1);
    var date = curTime.getDate() > 9 ? curTime.getDate() : '0' + curTime.getDate();
    var hh = curTime.getHours() > 9 ? curTime.getHours() : '0' + curTime.getHours();
    var ii = curTime.getMinutes() > 9 ? curTime.getMinutes() : '0' + curTime.getMinutes();
    console.log(curTime);
    var beforeTime = new Date(curTime - 12*60*60*1000);
    console.log(beforeTime);
    var byear = beforeTime.getFullYear();
    var bmonth = beforeTime.getMonth() + 1 > 9 ? beforeTime.getMonth() + 1 : '0' + (beforeTime.getMonth() + 1);
    var bdate = beforeTime.getDate() > 9 ? beforeTime.getDate() : '0' + beforeTime.getDate();
    var bhh = beforeTime.getHours() > 9 ? beforeTime.getHours() : '0' + beforeTime.getHours();
    var bii = beforeTime.getMinutes() > 9 ? beforeTime.getMinutes() : '0' + beforeTime.getMinutes();

    this.toTime = year + "-" + month + "-" + date + "T" + hh + ':' + ii + ":00";
    this.fromTime = byear + "-" + bmonth + "-" + bdate + "T" + bhh + ':' + bii + ":00";
    this.rootScope = $rootScope;
    this.timeInterval = null;
    this.timePeriod = "12h";
    this.newsJournal = [];
    this.reddit = [];
    this.twitter = [];

    this.lstCurrencies = [];

    this.lstCurrencyValues = [];

    this.mainCurrencyType = 0;
    this.setFromTime = function(_fromTime){
      this.fromTime = _fromTime;
      this.getWordCloudData(this)
    }
    this.setToTime = function(_toTime){
      this.toTime = _toTime;
      this.getWordCloudData(this)
    }
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

      this.getCurrencyList(this);
      
      if( this.lstCurrencies.length){
        this.getCryptoCurrencies(this);
      }
    }
    this.applyDatas = function(){
      $rootScope.$apply();
    }
    ////////////////////////// Get Crypto Currencies
    this.getCryptoCurrencies = function(_this){
      for( var i = 0; i < _this.lstCurrencies.length; i++){
        var strCurrency = _this.lstCurrencies[i];
        $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/get_currency/" + strCurrency,
          dataType: 'json',
          success: function(data){
            if( data.length != 0){
              var currency = data[0].currency;
              _this.lstCurrencyValues[currency] = data;
              _this.applyDatas();
            }
          }
        });
      }
    }
    this.getCurrentCurrency = function(){
      var _type = this.lstCurrencies[this.mainCurrencyType];
      return this.lstCurrencyValues[_type];
    }
    this.getLstCurrencyValues = function(){
      return this.lstCurrencyValues;
    }
    ////////////////////////// Get Currency List
    this.getCurrencyList = function(_this){
      $.ajax({
        method: 'GET',
        data: {},
        url: "http://apps.icaroai.com/icaroai/rest/charting/getCurrencyList",
        dataType: 'json',
        success: function(data){
          _this.lstCurrencies = data;
          _this.getCryptoCurrencies(_this);
          _this.applyDatas();
        }
      });
    }
    this.getCurrencyListData = function(){
      return this.lstCurrencies;
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

    this.createTimeInterval = function(){
      this.getServices();
      this.timeInterval = setInterval( this.getServices(), 1000 * this.getTimeInterval());
    }
    this.setTimeInterval = function(_timeInterval){
      if( this.timeInterval != null){
        clearInterval(this.timeInterval);
      }
      // this.timePeriod = _timeInterval;
      this.createTimeInterval();
    }
    this.setCurrencyType = function(_nType){
        this.mainCurrencyType = _nType;
    }
    this.getCurrencyType = function(){
      return this.mainCurrencyType;
    }

    
    this.mainType = "BTC";
    this.subType = "ETH";
    this.techanChartData = [];
    this.isChange = false;
    this.getTechanChartData = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/chart/"+_this.mainType+"/"+_this.subType+"/12h",
          dataType: 'json',
          success: function(data){
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
      this.mainType = _mainType;
      this.subType = _subType;
      this.getTechanChartData(this);
    }


    /////////////////////////

    this.wordKind = 0;
    this.newWordCloudSentence = "";
    this.redditWordCloudSentence = "";
    this.twittsWordCloudSentence = "";
    this.twittsHashtagCloudSentence = "";
    this.twittsScreenNameCloudSentence = "";
    this.applyDatas = function(){
      $rootScope.$apply();
    }
    this.makeSentences = function(_data){
      var strBuf = "";
      for( var i = 0; i < _data.length; i++){
        for( var j = 0; j < _data[i].count; j++){
          strBuf += _data[i].word + " ";
        }
      }
      return strBuf;
    }
    this.getWordCloudData = function(_this){
      if( this.fromTime == "" | this.toTime == "")
        return;
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudNewsWord/"+this.fromTime+"/"+this.toTime,
          dataType: 'json',
          success: function(data){
            _this.newWordCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudRedditWord/"+this.fromTime+"/"+this.toTime,
          dataType: 'json',
          success: function(data){
            _this.redditWordCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudTweetsScreenName/"+this.fromTime+"/"+this.toTime,
          dataType: 'json',
          success: function(data){
            _this.twittsWordCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudTweetsHashtag/"+this.fromTime+"/"+this.toTime,
          dataType: 'json',
          success: function(data){
            _this.twittsHashtagCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudTweetsWord/"+this.fromTime+"/"+this.toTime,
          dataType: 'json',
          success: function(data){
            _this.twittsScreenNameCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
    }
    this.setWordKind = function(_index){
      this.wordKind = _index;
      console.log( this.wordKind);
    }
    this.getWordData = function(){
      switch(this.wordKind){
        case 0: return this.newWordCloudSentence;
        case 1: return this.redditWordCloudSentence;
        case 2: return this.twittsWordCloudSentence;
        case 3: return this.twittsHashtagCloudSentence;
        case 4: return this.twittsScreenNameCloudSentence;
      }
      return this.newWordCloudSentence;
    }
    this.getWordCloudData(this);
    this.getFromTime = function(){
      return this.fromTime;
    }
    this.getToTime = function(){
      return this.toTime;
    }
  }

})();
