(function() {
    'use strict';
    //var app = angular.module('plunker', ['nvd3']);

    angular
        //.module('lglsystem',['nvd3'])
        .module("lglsystem")
        .config(["$routeProvider",
            function(routeProvider) {
                routeProvider
                .when("/main", {
                    templateUrl: "views/partials/main.html",
                    controller: "mainController",
                })
                    .when("/vendor", {
                        templateUrl: "views/partials/vendormain.html",
                        controller: "vendormainController",
                    })
                      .when("/budjet", {
                          templateUrl: "views/partials/budjetmain.html",
                          controller: "budjetmainController",
                      })
                     .when("/mattersummery", {
                         templateUrl: "views/partials/mattersummerymain.html",
                         controller: "mattersummeryController",
                     })
                     .when("/dashboard", {
                         templateUrl: "views/partials/mydashboard.html",
                         controller: "dashboardController",
                     })
                    .otherwise({
                        redirectTo: "/dashboard"
                    })
            }
        ])
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts 
        ChartJsProvider.setOptions({
            chartColors: ['#E9C24D','#7658F9','#2ed700' , '#FF5252', '#a5ce00', '#FF8A80', '#0078d7'],
            responsive: true
           });
        // Configure all line charts 
        ChartJsProvider.setOptions('line', {
            showLines: true
        });
    }])

  
})();