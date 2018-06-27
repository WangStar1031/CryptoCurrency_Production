/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('bellowContents', bellowContents);

  /** @ngInject */
  function bellowContents() {
    return {
      restrict: 'E',
      controller: 'bellowContentsCtrl',
      templateUrl: 'app/pages/dashboard/bellowContents/bellowContents.html'
    };
  }
})();