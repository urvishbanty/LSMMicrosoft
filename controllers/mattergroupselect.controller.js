(function () {
    'use strict';

    angular
    	.module('lglsystem')
    	.controller('mattergroupselectController', mattergroupselectController);

    mattergroupselectController.$inject = ['invoiceService',  '$scope', '$filter', '$modalInstance', '$modal', 'lglsystemData'];

    function mattergroupselectController(invoiceService,  $scope, $filter, $modalInstance, $modal, lglsystemData) {
        $scope.filtertype = lglsystemData.filtertype;
        $scope.matterDetaildata = [];


        function getmattersreportinggroup() {
            invoiceService.getCurrencygroup()
            .then(function (op_data) {
                if (op_data) {
                    $scope.matterDetaildata = op_data.d.results;
                    console.log('$scope.matterDetaildata ' , $scope.matterDetaildata);
                   
               }
            });
        };

        function getZprsShWerksSet() {

            invoiceService.getZprsShWerksSet()
                .then(function (op_data) {
                    if (op_data) {

                        $scope.matterDetaildata = op_data.d.results;

                    }

                });
        };

        function getMatters() {

            invoiceService.getMatters()
                .then(function (op_data) {
                    if (op_data) {

                        $scope.matterDetaildata = op_data.d.results;

                    }

                });
        };

        function getCounVendorSet() {

            invoiceService.getCounVendorSet()
                .then(function (op_data) {
                    if (op_data) {

                        $scope.matterDetaildata = op_data.d.results;

                    }

                });
        };

        $scope.selecteditem = function selecteditem(item) {
            $modalInstance.close(item);
        };

        $scope.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };

        function init() {
            if ($scope.filtertype === 'reporting') {
                getmattersreportinggroup();
            }
            if ($scope.filtertype === 'store') {
                getZprsShWerksSet();
            }
            if ($scope.filtertype === 'matter') {
                getMatters();
            }
            if ($scope.filtertype === 'vendor') {
                getCounVendorSet();
            }
        };
        init();
    }
})();
