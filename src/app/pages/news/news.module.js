/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.news', [])
      .config(routeConfig)
      .controller('newsCtrl', newsCtrl);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('news', {
          url: '/news',
          templateUrl: 'app/pages/news/news.html',
          title: 'News',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 1,
          },
        });
  }
  function newsCtrl($scope, $interval, pagesService){
  }

})();
