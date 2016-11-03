(function () {
    'use strict';

    angular
    	.module('lglsystem')
    	.controller('rejectcommentController', rejectcommentController);

    rejectcommentController.$inject = ['$scope', '$filter', '$modalInstance', '$modal', 'lglsystemData', 'invoiceService'];

    function rejectcommentController($scope, $filter, $modalInstance, $modal, lglsystemData, invoiceService) {

        $scope.comments = lglsystemData.comments;
        $scope.rejectinvoice = rejectinvoice;



        function rejectinvoice() {
            invoiceService.rejectInvoices(lglsystemData.selectedrows, $scope.comments)
                           .then(function (op_data) {
                               if (op_data) {
                                   $modalInstance.close(op_data);
                               }

                           });
        };


        $scope.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };
    }

})();
