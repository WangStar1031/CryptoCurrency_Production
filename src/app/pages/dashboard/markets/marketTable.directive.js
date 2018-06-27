/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('marketTable', marketTable);

  /** @ngInject */
  function marketTable() {
    return {
      restrict: 'E',
      controller: 'marketTableCtrl',
      templateUrl: 'app/pages/dashboard/markets/marketTable.html'
    };
  }
})();