/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardTopScroll', dashboardTopScroll);

  /** @ngInject */
  function dashboardTopScroll() {
    return {
      restrict: 'E',
      controller: 'dashboardTopScrollCtrl',
      templateUrl: 'app/pages/dashboard/dashboardTopScroll/dashboardTopScroll.html'
    };
  }
})();