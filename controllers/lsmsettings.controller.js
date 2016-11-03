(function () {
    'use strict';
    angular
    .module('lglsystem')
    .controller('lsmsettingsController', lsmsettingsController);

    lsmsettingsController.$inject = ['$scope', '$filter', '$modalInstance', '$modal', 'lglsystemData'];

    function lsmsettingsController($scope, $filter, $modalInstance, $modal, lglsystemData) {
       
        
        console.log(lglsystemData.detailmode);
        
        var info = '<md-tooltip md-direction="left" ng-if="row.entity.statusmessageinfo">{{row.entity.statusmessageinfo}}</md-tooltip><span ng-class="grid.appScope.getEditBackgroundColour(row.entity)">{{row.entity.statusmessage}}</span>';
        var statusTemplate = '<md-checkbox ng-model="row.entity.isSelect" ng-click="$event.stopPropagation()"></md-checkbox>';
        var statusheaderTemplate = '<md-checkbox type="checkbox" ng-change="grid.appScope.clientcheckAll()" ng-model="grid.appScope.checkboxmodel.clientselectedAll"></md-checkbox>';
        var docpopup = '<div ng-click="$event.stopPropagation();grid.appScope.getFileList(row.entity)" ng-if="row.entity.HasAttachments"  class="wp_filterblue wp_cofile blue wp_page_cl05"></div>';
        // var rejinfo = '<md-tooltip md-direction="left" ng-if="row.entity.ZzrejComments">{{row.entity.ZzrejComments}}</md-tooltip><i style="color:red;" class="fa fa-info-circle fa-2x"></i>';
        var rejinfo = '<i style="color:red;" ng-if="row.entity.ZzrejComments" ng-click="$event.stopPropagation();grid.appScope.showcomments(row.entity.ZzrejComments)" class="fa fa-info-circle fa-2x"></i>';
        if (lglsystemData.detailmode === false) {
            $scope.lsmcolumnsgrid = lglsystemData.lsmdetailscolumns;
            $scope.lsmcolumns = [
             { name: '', allowCellFocus: false, pinnedLeft: true, headerCellTemplate: statusheaderTemplate, field: 'Zzebeln', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: statusTemplate, width: 40 },
              { name: 'Matter', pinnedLeft: true, field: 'ZzlawFirmMatterId', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150", cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzmatterName + " - " +row.entity.ZzlawFirmMatterId+""}}</div>' },
              { name: 'Vendor ', field: 'ZzvendorName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
              { name: 'Purchase Order', pinnedLeft: true, field: 'Zzebeln', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
            { name: 'Invoice Number', field: 'ZzinvoiceNumber', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
               { name: 'Status', pinnedLeft: true, field: 'statusmessage', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150", cellTemplate: info },
                 { name: 'Client Id', field: 'ZzclientId', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150", cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzclientidName + " - " + row.entity.ZzclientId +""}}</div>' },
                { name: 'Vendor Tax Id', field: 'ZzlawFirmTaxid', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
                  { name: 'Invoice Date', field: 'ZzinvoiceDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzinvoiceDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: "150" },
                    { name: 'Work Start Date', field: 'ZzbillingStartDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzbillingStartDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: "150" },
                    { name: 'Work End Date', field: 'ZzbillingEndDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzbillingEndDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: "150" },
                      { name: 'Reviewer', field: 'ZzreviewerName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "120" },
                        { name: 'Billing Office Name', field: 'ZzbillingOfficeName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
                  { name: 'Days of Outstanding', field: 'Zzdaysoutstanding', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
                { name: 'Payment Terms', field: 'Zterm', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
                            { name: 'Billed Amount', field: 'ZzinvoiceTotal', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
                { name: 'Currency', field: 'ZzinvCurrency', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
                  { name: 'Tax Amount', field: 'ZztaxAmount', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
                { name: 'Matter Budget Amount', field: 'ZzmatterBudget', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
                   { name: 'Remaining Budget Amount', field: 'ZZREMAIN_BDGT', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
                  { name: 'Attachments', field: 'HasAttachments', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: docpopup, width: "120" },
                    { name: 'Reject Comments', allowCellFocus: false, field: 'ZzrejComments', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150", cellTemplate: rejinfo },


            ]
            
        }

        if (lglsystemData.detailmode === true) {
            $scope.lsmcolumnsgrid = lglsystemData.lsmdetailsdatacolumns
            $scope.lsmcolumns = [
                                { name: 'Line Item', pinnedLeft: true, field: 'ZzlineItemNumber', disableHiding: true, width: "100", headerCellClass: 'gridHead gridCell', cellClass: 'gridCell' },
                    { name: 'Matter Phase', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Zzphase + " - " +row.entity.ZzphaseName+""}}</div>', pinnedLeft: true, field: 'Zzphase', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
                { name: 'TK Name', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZztimekeeperId + "-" +row.entity.ZztimekeeperName+")"}}</div>', pinnedLeft: true, field: 'ZztimekeeperName', disableHiding: true, width: "100", headerCellClass: 'gridHead gridCell', cellClass: 'gridCell' },
                                 { name: 'Activity Type', field: 'Zzlstar', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                                  { name: 'Working Office', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzworkingOffice + "(" +row.entity.ZzworkingOfficeName+")"}}</div>', field: 'ZzworkingOffice', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },

                                    { name: 'Work Date', field: 'ZzlineItemDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzlineItemDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: "100" },
                               { name: 'Status', pinnedLeft: true, field: 'statusmessage', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100", cellTemplate: info },
                                                { name: 'Units', field: 'Units', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                                     { name: 'Billed Rate', field: 'ZzbilledRate', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },



                 { name: 'Agreed Rate', field: 'ZzagreedRate', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },

                                  { name: 'Amount', field: 'Amount', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                 { name: 'Tax', field: 'Tax', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                                  { name: 'Discount', field: 'Discount', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },

                                  { name: 'Agreed Discount', field: 'AgreedDiscount', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                 { name: 'Total', field: 'Total', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                                                   { name: 'Task Code', field: 'ZztaskCode', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },

                                  { name: 'Activity Code', field: 'ZzactivityCode', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                                  { name: 'Narrative', field: 'ZzlineItemDescription', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "400" },


            ]
        }

        _.each($scope.lsmcolumns, function (item) {
            item.isSelect = false;
            if (_.find($scope.lsmcolumnsgrid, function (o) { return o.name == item.name; })) {
                item.isSelect = true;
            }
        });
        $scope.selectall = false;
        $scope.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };

        $scope.selectallitems = function () {
            _.each($scope.lsmcolumns, function (item) {
                item.isSelect = $scope.selectall;
            });
        }

        //$scope.setColumns = function setColumns() {

        //}

        $scope.setColumns = function setColumns() {
            var columns = []

            var columns = _.filter($scope.lsmcolumns, function (o) { return o.isSelect })
            _.each(columns, function (item) {
                // delete item.isSelect;
                 item.Visible=false;
            });
            // columns = transferitem.concat(columns);
            $modalInstance.close(columns);
        };

    }

})();