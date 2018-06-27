/**
 * @author a.demeshko
 * created on 12/18/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.techanChart', [])
    .config(routeConfig).config(techanChartConfig);
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.techanChart', {
        url: '/techanChart',
        templateUrl: 'app/pages/dashboard/techanChart/techanChart.html'
      });
  }

  function techanChartConfig( baConfigProvider) {
      var layoutColors = baConfigProvider.colors;
  }
})();