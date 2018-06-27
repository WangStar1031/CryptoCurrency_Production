/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts', [
      // 'BlurAdmin.pages.charts.amCharts',
      // 'BlurAdmin.pages.charts.chartJs',
      // 'BlurAdmin.pages.charts.chartist',
      'BlurAdmin.pages.charts.simplePieChart',      
      'BlurAdmin.pages.charts.detailDonutChart',
      'BlurAdmin.pages.charts.wordCloud'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts', {
          url: '/social',
          // abstract: true,
          templateUrl: 'app/pages/charts/charts.html',
          title: 'Social Monitoring',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 50,
          },
        });
  }

})();
