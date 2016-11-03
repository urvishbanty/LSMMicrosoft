(function () {


    'use strict';

    angular
    	.module('lglsystem')
    	.directive('resizeGrid', resizeGrid);

    resizeGrid.$inject = ['$window'];


    function resizeGrid($window) {
        return function (scope, element) {
            var $w = $($window);
            var fixGridHeight = function () {
               // alert($w.height());
              //  alert($(element).position().top);
                var eleheight = $(element).position().top;
                if (eleheight == 0) { eleheight = $w.height() / 3 }
              //  alert($w.height());
             //   alert(eleheight);
               
                var height = $w.height() - eleheight - $("footer").height() - 10;
                element.css('height', height + 'px');

                if (!_.isUndefined(element.data().$uiGridController)) {
                    var grid = element.data().$uiGridController.grid;
                    if (!_.isUndefined(grid)) {
                        grid.gridHeight = height - 10;
                        //grid.gridWidth = element.css("width");
                        grid.refresh();
                    }
                }
            };
            $w.on('resize', function () {
                fixGridHeight();
            });
            fixGridHeight();
        }
        var service = {
            resizeGrid: resizeGrid,

        };
        return service;

    };

})();