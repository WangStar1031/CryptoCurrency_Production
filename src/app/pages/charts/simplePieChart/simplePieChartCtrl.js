(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.simplePieChart')
    .controller('simplePieChartCtrl', simplePieChartCtrl)
    .service('simplePieChartService', simplePieChartService);

  /** @ngInject */
  function simplePieChartCtrl($scope, baConfig, $interval, simplePieChartService) {
    $scope.service = simplePieChartService;
    var layoutColors = baConfig.colors;

    $scope.labels =[];
    $scope.data = [];
    $scope.options = {
      elements: {
        arc: {
          borderWidth: 0
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: layoutColors.default//layoutColors.defaultText
        }
      }
    };
    var isFirst = false;
    $scope.$watch('service.getPieData()', function(_newData){
      $scope.labels = [];
      $scope.data = [];
      for(var i = 0; i < _newData.length; i++){
        $scope.labels.push( _newData[i].val);
        $scope.data.push( _newData[i].count);
      }
    });
    $interval( $scope.service.postService(), 1000 * 60 * 5);
  }
  function simplePieChartService($rootScope){
    this.pieChartData = [];
    this.postService = function(){
      this.getPieChartData(this);
    }
    this.getPieChartData = function(_this){
      $.ajax({
          method: 'GET',
          data: {},
          url: "http://apps.icaroai.com/icaroai/rest/charting/getConfidenceChart/12h",
          dataType: 'json',
          success: function(data){
            _this.pieChartData = data;
            $rootScope.$apply();
          }
      });
    }
    this.getPieData = function(){
      return this.pieChartData;
    }
    this.postService();
  }

})();