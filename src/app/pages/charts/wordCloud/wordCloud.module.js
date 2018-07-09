/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.wordCloud', [])
      // .config(routeConfig)
      .controller('WordCloudCtrl', WordCloudCtrl);

  /** @ngInject */
  // function routeConfig($stateProvider) {
  //     $stateProvider
  //         .state('charts.wordCloud', {
  //             url: '/wordCloud',
  //             templateUrl: 'app/pages/charts/wordCloud/wordCloud.html',
  //         });
  // }
  function WordCloudCtrl($scope, pagesService){
    console.log("WordCloudCtrl");
    $scope.service = pagesService;
    $scope.strFromTime = "";
    $scope.strToTime = "";
    $scope.standardSelectItems = [
      { label: 'News Word', value: 0 },
      { label: 'Reddit Word', value: 1 },
      { label: 'Tweets Word', value: 2 },
      { label: 'Tweets HashTag', value: 3 },
      { label: 'Tweets ScreenName', value: 4 },
    ];
    $scope.standardSelected = "News Word";
    
    $scope.wordKindChanged = function(){
      var selLabel = $(".selectpicker").val();
      console.log($scope.strFromTime);
      console.log($scope.strToTime);
      for( var i = 0; i < $scope.standardSelectItems.length; i++){
        var cur = $scope.standardSelectItems[i];
        if( cur.label == selLabel){
          console.log(selLabel);
          pagesService.setWordKind(cur.value);
          break;
        }
      }
    }
    $scope.onDraw =function(){
      $scope.service.setFromTime($scope.service.local2UTC(new Date($scope.strFromTime)));
      $scope.service.setToTime($scope.service.local2UTC( new Date($scope.strToTime)));
      $scope.service.getWordCloudData($scope.service);
      // var aaa = $scope.service.getWordData();
      // console.log(aaa);
      // parseText(aaa);
    }
    $scope.changeTimeFormat = function(_date){
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1);
      var date = _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate();
      var hh = _date.getHours() > 9 ? _date.getHours() : '0' + _date.getHours();
      var ii = _date.getMinutes() > 9 ? _date.getMinutes() : '0' + _date.getMinutes();
      return year + "-" + month + "-" + date + " " + hh + ':' + ii;
    }
    $scope.$watch('service.getWordData()', function(_newData){
      if( _newData == "")return;
      if( !_newData)return;
      parseText(_newData);
    });
    $scope.$watch('service.getFromTime()', function(_newData){
      $scope.strFromTime = $scope.changeTimeFormat($scope.service.utc2Local(_newData));
    });
    $scope.$watch('service.getToTime()', function(_newData){
      $scope.strToTime = $scope.changeTimeFormat($scope.service.utc2Local(_newData));
    });
    pagesService.setWordKind(0);
  }
})();
