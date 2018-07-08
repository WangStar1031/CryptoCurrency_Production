/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.wordCloud', [])
      .config(routeConfig)
      .controller('WordCloudCtrl', WordCloudCtrl);

  /** @ngInject */
  function routeConfig($stateProvider) {
      $stateProvider
          .state('charts.wordCloud', {
              url: '/wordCloud',
              templateUrl: 'app/pages/charts/wordCloud/wordCloud.html',
          });
  }
  function WordCloudCtrl($scope, pagesService){
    $scope.service = pagesService;
    $scope.strFromTime = "";
    $scope.strToTime = "";
    $scope.standardSelectItems = [
      { label: 'News Word', value: 0 },
      { label: 'Reddit Word', value: 1 },
      { label: 'Twitts Word', value: 2 },
      { label: 'Twitts HashTag', value: 3 },
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
    $scope.$watch('service.getWordData()', function(_newData){
      parseText(_newData);
    });
    $scope.$watch('service.getFromTime()', function(_newData){
      $scope.strFromTime = _newData.replace('T', ' ');
    });
    $scope.$watch('service.getToTime()', function(_newData){
      $scope.strToTime = _newData.replace('T', ' ');
    });
    pagesService.setWordKind(0);
  }

})();
