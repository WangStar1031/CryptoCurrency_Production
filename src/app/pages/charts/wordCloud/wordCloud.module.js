/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.wordCloud', [])
      .config(routeConfig)
      .service('WordCloudService', WordCloudService)
      .controller('WordCloudCtrl', WordCloudCtrl);

  /** @ngInject */
  function routeConfig($stateProvider) {
      $stateProvider
          .state('charts.wordCloud', {
              url: '/wordCloud',
              templateUrl: 'app/pages/charts/wordCloud/wordCloud.html',
          });
  }
  function WordCloudService($rootScope){
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
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudNewsWord/2018-01-01T00:00:42/2018-01-10T00:00:42",
          dataType: 'json',
          success: function(data){
            _this.newWordCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudRedditWord/2018-01-01T00:00:42/2018-01-10T00:00:42",
          dataType: 'json',
          success: function(data){
            _this.redditWordCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudTweetsScreenName/2018-01-01T00:00:42/2018-01-10T00:00:42",
          dataType: 'json',
          success: function(data){
            _this.twittsWordCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudTweetsHashtag/2018-01-01T00:00:42/2018-01-10T00:00:42",
          dataType: 'json',
          success: function(data){
            _this.twittsHashtagCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getWordCloudTweetsWord/2018-01-01T00:00:42/2018-01-10T00:00:42",
          dataType: 'json',
          success: function(data){
            _this.twittsScreenNameCloudSentence = _this.makeSentences(data);
            $rootScope.$apply();
          }
      });
    }
    this.setWordKind = function(_index){
      this.wordKind = _index;
    }
    this.getWordData = function(){
      switch(this.wordKind){
        case 1: return this.newWordCloudSentence;
        case 2: return this.redditWordCloudSentence;
        case 3: return this.twittsWordCloudSentence;
        case 4: return this.twittsHashtagCloudSentence;
        case 5: return this.twittsScreenNameCloudSentence;
      }
      return this.newWordCloudSentence;
    }
    this.getWordCloudData(this);
  }
  function WordCloudCtrl($scope, WordCloudService){
    $scope.service = WordCloudService;

    $scope.standardSelectItems = [
      { label: 'News Word', value: 1 },
      { label: 'Reddit Word', value: 2 },
      { label: 'Twitts Word', value: 3 },
      { label: 'Twitts HashTag', value: 4 },
      { label: 'Tweets ScreenName', value: 5 },
    ];
    $scope.standardSelected = "News Word";
    
    $scope.wordKindChanged = function(){
      WordCloudService.setWordKind($scope.standardSelected.value);
    }
    $scope.$watch('service.getWordData()', function(_newData){
      parseText(_newData);
    });
  }

})();
