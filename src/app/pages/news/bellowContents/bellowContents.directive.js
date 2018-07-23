/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.news')
      .directive('bellowContents', bellowContents);

  /** @ngInject */
  function bellowContents() {
    return {
      restrict: 'E',
      controller: 'bellowContentsCtrl',
      templateUrl: 'app/pages/news/bellowContents/bellowContents.html'
    };
  }
})();