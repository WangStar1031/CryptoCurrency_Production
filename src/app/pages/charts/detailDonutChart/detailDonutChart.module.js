/**
 * @author a.demeshko
 * created on 12/18/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.detailDonutChart', [])
    .config(routeConfig).config(detailDonutChartConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts.detailDonutChart', {
          url: '/detailDonutChart',
          templateUrl: 'app/pages/charts/detailDonutChart/detailDonutChart.html',
          // title: 'Morris',
          // sidebarMeta: {
          //   order: 300,
          // }
        });
  }

    function detailDonutChartConfig(ChartJsProvider, baConfigProvider) {
        var layoutColors = baConfigProvider.colors;
    }

})();