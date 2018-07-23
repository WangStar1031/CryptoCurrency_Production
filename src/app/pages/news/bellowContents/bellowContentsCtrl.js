/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.news')
      .controller('bellowContentsCtrl', bellowContentsCtrl);

  /** @ngInject */
  function bellowContentsCtrl($scope, baConfig, colorHelper, pagesService) {
    $scope.service = pagesService;
    $scope.currency_type = 0;
    $scope.newsJournals = [];
    $scope.reddits = [];
    $scope.twitters = [];
    $scope.$watch('service.getNewsJournalData()', function(_newsData){
      $scope.newsJournals = _newsData;
    });
    $scope.$watch('service.getRedditData()', function(_newsData){
      $scope.reddits = _newsData;
    });
    $scope.$watch('service.getTwitterData()', function(_newsData){
      $scope.twitters = _newsData;
    });
  }
})();