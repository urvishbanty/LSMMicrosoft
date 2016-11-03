(function () {
    'use strict';
    angular
    .module('lglsystem')
    .controller('lsmtimekeepersettingsController', lsmtimekeepersettingsController);

    lsmtimekeepersettingsController.$inject = ['$scope', '$filter', '$modalInstance', '$modal', 'lglsystemData'];

    function lsmtimekeepersettingsController($scope, $filter, $modalInstance, $modal, lglsystemData) {

        if (lglsystemData.settingvariable === 'timekeepersetting') {
            var info = '<md-tooltip md-direction="left" ng-if="row.entity.info">{{row.entity.info}}</md-tooltip><img ng-if="row.entity.info"  ng-src="{{row.entity.imagedisplay}}"></img>';
            var statusTemplate = '<md-checkbox ng-model="row.entity.isSelect"></md-checkbox>';
            var statusheaderTemplate = '<md-checkbox type="checkbox" ng-change="grid.appScope.clientcheckAll()" ng-model="grid.appScope.checkboxmodel.clientselectedAll"></md-checkbox>';

            $scope.lsmcolumnsgrid = lglsystemData.lsmtimekeepercolumns;
            $scope.lsmcolumns = [
                                                                    { name: '', enableFiltering: false, pinnedLeft: true, enableCellEdit: false, allowCellFocus: false, headerCellTemplate: statusheaderTemplate, field: 'Kunnr', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: statusTemplate, width: 40 },
             { name: 'info', enableCellEdit: false, enableFiltering: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: info, width: 100 },
                                                                { name: 'Matter', enableCellEdit: false, field: 'Pspid', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 200 },

                                        { name: 'Matter Name', field: 'Post1', enableCellEdit: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 200 },
                { name: 'TimeKeeper', field: 'Pernr', enableCellEdit: false, disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 200 },
                    //{
                    //    name: 'Rate', field: 'Kbetr', enableCellEdit: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150
                    //    ,
                    //    cellEditableCondition: function ($scope) {

                    //        return ($scope.row.entity.Status != 'P');
                    //        }
                    //},
                                                      { name: 'Timekeeper Name', enableCellEdit: false, field: 'Sname', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 200 },

                                                            { name: 'Rate', enableFiltering: false, enableCellEdit: false, field: 'Kbetr', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },

                                        { name: 'Currency', enableFiltering: false, enableCellEdit: false, field: 'Konwa', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },
                                                                      { name: 'Status', enableFiltering: false, enableCellEdit: false, field: 'Status', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Status| vendorfilter}}</div>', width: 100 },

                                       { name: 'PricingUnit', enableFiltering: false, enableCellEdit: false, field: 'Kpein', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },
                                        { name: 'Unit', enableFiltering: false, enableCellEdit: false, field: 'Kmein', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },

                 { name: 'DateFrom', enableFiltering: false, enableCellEdit: false, field: 'Datab', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Datab| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 150 },
                                  { name: 'DateTo', enableFiltering: false, enableCellEdit: false, field: 'Datbi', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Datbi| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 150 },

                    //  { name: 'VendorName', enableCellEdit: false, field: 'Name1', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 200 },

            ]

        }
            if (lglsystemData.settingvariable === 'budetsettings')
            {
                var info = '<md-tooltip md-direction="left" ng-if="row.entity.info">{{row.entity.info}}</md-tooltip><img ng-if="row.entity.info"  ng-src="{{row.entity.imagedisplay}}"></img>';
                var statusTemplate = '<md-checkbox ng-model="row.entity.isSelect"></md-checkbox>';
                var statusheaderTemplate = '<md-checkbox type="checkbox" ng-change="grid.appScope.clientcheckAll()" ng-model="grid.appScope.checkboxmodel.clientselectedAll"></md-checkbox>';


                $scope.lsmcolumnsgrid = lglsystemData.lsmbudetcolumns;

                $scope.lsmcolumns = [

                { name: '', allowCellFocus: false, enableCellEdit: false, pinnedLeft: true, headerCellTemplate: statusheaderTemplate, field: 'Bukrs', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: statusTemplate, width: 40 },

            { name: 'info', allowCellFocus: false, enableCellEdit: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: info, width: 100 },
                { name: 'Vendor', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Vendor + " - " +row.entity.Name1+""}}</div>', enableCellEdit: false, field: 'Vendor', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true },
                                        { name: 'Vendor Name', visible: false, enableCellEdit: false, field: 'Name1', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },
                { name: 'Compcode', visible: false, field: 'Bukrs', enableCellEdit: false, disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 100 },
                { name: 'Office', visible: false, field: 'Werks', enableCellEdit: false, disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 100 },
                    { name: 'Matter', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Pspid + " - " +row.entity.Post1}}</div>', field: 'Pspid', enableCellEdit: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true },
                                        { name: 'Matter Name', visible: false, field: 'Post1', enableCellEdit: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 200 },

                                     { name: 'Status', field: 'StatusText', enableCellEdit: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 250 },

                 { name: 'Fiscal Year', visible: false, field: 'Gjahr', enableCellEdit: false, disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 150 },
                                  { name: 'GL Account', visible: false, enableCellEdit: false, field: 'Hkont', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 150 },
                                  { name: 'Amount', enableCellEdit: true, field: 'Amount', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 150 },
                                         { name: 'Currency', enableCellEdit: true, field: 'Currency', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 150 },
                                              { name: 'Matter Phase', visible: false, displayName: 'Matter Phase', enableCellEdit: false, field: 'Posid', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 150 },

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
                item.Visible = false;
            });
            // columns = transferitem.concat(columns);
            $modalInstance.close(columns);
        };

    }

})();