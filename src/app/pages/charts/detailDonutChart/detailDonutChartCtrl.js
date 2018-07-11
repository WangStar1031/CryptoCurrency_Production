/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.detailDonutChart')
      .controller('detailDonutChartCtrl', detailDonutChartCtrl);

  /** @ngInject */
  function detailDonutChartCtrl($element, $scope, layoutPaths, baConfig, pagesService) {
    console.log("detailDonutChartCtrl");
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    $scope.service = pagesService;
    $scope.pieChart = null;
    $scope.topWritersData = [];
    $scope.dataProvider = function(){
      return $scope.topWritersData;
    }
    $scope.createChart = function(){
     $scope.pieChart= AmCharts.makeChart(id, {
      type: 'pie',
      startDuration: 0,
      theme: 'blur',
      addClassNames: true,
      color: layoutColors.default,//layoutColors.defaultText,
      labelTickColor: layoutColors.default,//layoutColors.borderDark,
      legend: {
        position: 'right',
        marginRight: 100,
        autoMargins: false,
      },
      innerRadius: '40%',
      defs: {
        filter: [
          {
            id: 'shadow',
            width: '200%',
            height: '200%',
            feOffset: {
              result: 'offOut',
              in: 'SourceAlpha',
              dx: 0,
              dy: 0
            },
            feGaussianBlur: {
              result: 'blurOut',
              in: 'offOut',
              stdDeviation: 5
            },
            feBlend: {
              in: 'SourceGraphic',
              in2: 'blurOut',
              mode: 'normal'
            }
          }
        ]
      },
      dataProvider: $scope.dataProvider(),
      valueField: 'numtweet',
      titleField: 'screenname',
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-left',

      autoMargins: false,
      marginTop: 10,
      alpha: 0.8,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      pullOutRadius: 0,
      pathToImages: layoutPaths.images.amChart,
      responsive: {
        enabled: true,
        rules: [
          // at 900px wide, we hide legend
          {
            maxWidth: 900,
            overrides: {
              legend: {
                enabled: false
              }
            }
          },

          // at 200 px we hide value axis labels altogether
          {
            maxWidth: 200,
            overrides: {
              valueAxes: {
                labelsEnabled: false
              },
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 30,
              marginRight: 30
            }
          }
        ]
      }
    });
   }
    $scope.createChart();
    $scope.$watch('service.getTopWritersData()', function(_newData){
      $scope.topWritersData = _newData;
      $scope.createChart();
    });
  }

})();
