/**
 * @author a.demeshko
 * created on 12/17/15
 */


(function () {
    'use strict';

    angular.module('BlurAdmin.pages.charts.simplePieChart', [])
        .config(routeConfig).config(simplePieChartConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('charts.simplePieChart', {
                url: '/simplePieChart',
                templateUrl: 'app/pages/charts/simplePieChart/simplePieChart.html',
            });
    }

    function simplePieChartConfig(ChartJsProvider, baConfigProvider) {
        var layoutColors = baConfigProvider.colors;
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: [
                layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.default, layoutColors.primaryDark, layoutColors.successDark, layoutColors.warningLight, layoutColors.successLight, layoutColors.primaryLight],
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500
            },
            scale: {
                gridLines: {
                    color: layoutColors.border
                },
                scaleLabel: {
                    fontColor: layoutColors.defaultText
                },
                ticks: {
                    fontColor: layoutColors.defaultText,
                    showLabelBackdrop: false
                }
            }
        });
        // // Configure all line charts
        // ChartJsProvider.setOptions('Line', {
        //     datasetFill: false
        // });
        // // Configure all radar charts
        // ChartJsProvider.setOptions('radar', {
        //     scale: {
        //         pointLabels: {
        //             fontColor: layoutColors.defaultText
        //         },
        //         ticks: {
        //             maxTicksLimit: 5,
        //             display: false
        //         }
        //     }
        // });
        // // Configure all bar charts
        // ChartJsProvider.setOptions('bar', {
        //     tooltips: {
        //         enabled: false
        //     }
        // });
    }

})();