(function () {
    'use strict';

    angular
    	.module('lglsystem')
    	.controller('billdocattachments', billdocattachments);

    billdocattachments.$inject = ['$scope', '$filter', '$modalInstance', '$modal','$mdDialog', 'lglsystemData', 'invoiceService'];

    function billdocattachments($scope, $filter, $modalInstance, $modal,$mdDialog, lglsystemData, invoiceService) {

        // lglsystemData.selectedinvoiceNumber='9000018053';
        $scope.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };

        function init() {
            debugger;
            invoiceService.getFileList(lglsystemData.selectedinvoiceNumber)
            .then(function (op_data) {
                if (op_data) {
                    $scope.currentFileList = op_data.d.results;
                }
            });
        };
        init();
        $scope.opendocument = function (detail) {
            invoiceService.getFileDownload(detail, "_self");
        };
        $scope.deletedocument = function (detail) {
            invoiceService.deletedocument(lglsystemData.selectedinvoiceNumber, detail)
                        .then(function (op_data) {
                            if (op_data) {
                                if (!(_.isUndefined(op_data.d))) {
                                    var results = op_data.d;
                                    if (op_data) {
                                       var message = results.Message;
                                            $mdDialog.show(
                                            $mdDialog.alert()
                                            .title('Alert')
                                            .textContent(message)
                                            .ariaLabel('Alert Dialog Demo')
                                            .ok('Ok')
                                            )
                                    }
                                
                                    //var results = op_data.d.results;
                                    //var message = results[0].Message;
                                    //for (var i = 0; i < $scope.items.length; i++) {
                                    //    if (_.isUndefined(results[0].Message)) {
                                    //        detail.info = message;
                                    //    }
                                    //    else {
                                    //        detail.info = results[i].Message;
                                    //    }
                                    //    if (detail.info.indexOf("ERROR") != -1 || detail.info.indexOf("Error") != -1) {
                                    //        detail.imagedisplay = '/assets/images/img_alert_split-screen.png';
                                    //    }
                                    //    else {
                                    //        if (results[0].Iserror != 'X') {
                                    //            detail.imagedisplay = '/assets/images/alertsuccess.png';
                                    //        }
                                    //        else {
                                    //            detail.imagedisplay = '/assets/images/img_alert_split-screen.png';
                                    //        }
                                    //    }
                                    //}
                                    $scope.currentFileList = _.filter($scope.currentFileList, function (o) { return o != detail });
                                }
                                if (!(_.isUndefined(op_data.error))) {
                                   // for (var i = 0; i < $scope.items.length; i++) {
                                        detail.info = op_data.error.message.value;
                                        detail.imagedisplay = './assets/images/img_alert_split-screen.png';
                                   // }
                                }
                               
                            }
                        })

        };
    }
})();
