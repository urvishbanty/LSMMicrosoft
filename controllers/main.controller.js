(function () {
    'use strict';

    angular
    	.module('lglsystem')
    	.controller('mainController', mainController);

    mainController.$inject = ['$scope', '$filter', 'invoiceService', '$modal', '$timeout', 'lglsystemData', 'jrconstants', '$mdDialog', '$http'];

    function mainController($scope, $filter, invoiceService, $modal, $timeout, lglsystemData, jrconstants, $mdDialog, $http) {

        $scope.issideActive = false;
        $scope.detailmode = false;
        $scope.invoicesmasterlist = [];

        /*$scope.getMetaValues = function(){
            invoiceService.getMetaData()
                                .then(function (data) {
                                    console.log(data);
                                });
                            
        };*/

//         $http({
//   method: 'GET',
//   url: 'http://localhost:7070/s27/sap/opu/odata/SAP/ZPRS_LSW_SRV/HeaderSet?$format=json'
// }).then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });

        //  function getMatters() {

        //     invoiceService.getMatters()
        //         .then(function (op_data) {
        //             if (op_data) {
                        
        //                 $scope.matterDetaildata = op_data.d.results;
        //                 for(var post in  $scope.matterDetaildata){
        //                    // $scope.metavalues =
        //                     console.log($scope.matterDetaildata[post].Post1);
        //                 }
                        
        //             }

        //         });
        // };
        // getMatters();
        
        $scope.activesideButton = function () {
            $scope.issideActive = !$scope.issideActive;

        }
        $scope.dynamicPopover = {
            templateUrl: 'gridfilter.html',
            title: 'Filters'
        };
        $scope.checkboxmodel = {};
        $scope.checkboxmodel.clientselectedAll = false;
        var info = '<md-tooltip md-direction="left" ng-if="row.entity.statusmessageinfo">{{row.entity.statusmessageinfo}}</md-tooltip><span ng-class="grid.appScope.getEditBackgroundColour(row.entity)">{{row.entity.statusmessage}}</span>';
        var statusTemplate = '<md-checkbox ng-model="row.entity.isSelect" ng-click="$event.stopPropagation()"></md-checkbox>';
        var statusheaderTemplate = '<md-checkbox type="checkbox" ng-change="grid.appScope.clientcheckAll()" ng-model="grid.appScope.checkboxmodel.clientselectedAll"></md-checkbox>';
        var docpopup = '<div ng-click="$event.stopPropagation();grid.appScope.getFileList(row.entity)" ng-if="row.entity.HasAttachments"  class="wp_filterblue wp_cofile blue wp_page_cl05"></div>';
        //  var rejinfo = '<div  ng-click="$event.stopPropagation();grid.appScope.showcomments(row.entity.ZzrejComments)"  class="wp_filterblue wp_cofile blue wp_page_cl05"></div>';
        var rejinfo = '<i ng-if="row.entity.ZzrejComments" style="color:red;" ng-click="$event.stopPropagation();grid.appScope.showcomments(row.entity.ZzrejComments)" class="fa fa-info-circle fa-2x"></i>';

        $scope.clientcheckAll = function () {
            //if (!$scope.checkboxmodel.clientselectedAll) {
            //    $scope.clientselectedAll = true;
            //} else {
            //    $scope.clientselectedAll = false;
            //    $scope.matterselected = [];
            //}
            angular.forEach($scope.invoicesmasterlistcopy, function (item) {
                item.isSelect = $scope.checkboxmodel.clientselectedAll;

            });
        };


        $scope.gridData = {
            enableSorting: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableColumnResizing: true,
            multiSelect: false,
            enableGridMenu: false,
            rowHeight: 70,
            data: 'invoicesmasterlistcopy',

            columnDefs: [
             { name: '', allowCellFocus: false, pinnedLeft: true, headerCellTemplate: statusheaderTemplate, field: 'Zzebeln', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: statusTemplate, width: 40 },
              { name: 'Matter', pinnedLeft: true, field: 'ZzlawFirmMatterId', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150", cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzmatterName + " - " +row.entity.ZzlawFirmMatterId+""}}</div>' },
           // { name: 'Matter Name', pinnedLeft: true, field: 'ZzmatterName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
              { name: 'Vendor ',  field: 'ZzvendorName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
              { name: 'Purchase Order', pinnedLeft: true, field: 'Zzebeln', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
            { name: 'Invoice Number',  field: 'ZzinvoiceNumber', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150" },
               { name: 'Status', pinnedLeft: true, field: 'statusmessage', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150", cellTemplate: info },
                 { name: 'Client Id', field: 'ZzclientId', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "150", cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzclientidName + " - " + row.entity.ZzclientId +""}}</div>' },
          //      { name: 'Client Name', field: 'ZzclientidName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
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
            //plugins: [new ngGridFlexibleHeightPlugin()]
        };
        $scope.isRowSelected = false;
        $scope.gridData.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var msg = 'row selected ' + row.isSelected;
                $scope.isRowSelected = row.isSelected;
                lglsystemData.selectedrow = row.entity;

                getDetailinvoice(row.entity);
            });


        };

        $scope.gridDetailsData = {
            enableSorting: true,
            //  enableFiltering: true,
            enableColumnResizing: true,
            rowHeight: 70,
            enableGridMenu: false,
            data: 'invoicesdetaillistcopy',
            selectedItems: $scope.selectedRows,
            columnDefs: [
                                { name: 'Line Item', pinnedLeft: true, field: 'ZzlineItemNumber', disableHiding: true, width: "100", headerCellClass: 'gridHead gridCell', cellClass: 'gridCell' },
                    { name: 'Matter Phase', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Zzphase + " - " +row.entity.ZzphaseName+""}}</div>', pinnedLeft: true, field: 'Zzphase', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
                { name: 'TK Name', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZztimekeeperId + " - " +row.entity.ZztimekeeperName+")"}}</div>', pinnedLeft: true, field: 'ZztimekeeperName', disableHiding: true, width: "100", headerCellClass: 'gridHead gridCell', cellClass: 'gridCell' },
                                 { name: 'Activity Type',  field: 'Zzlstar', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                                  { name: 'Working Office', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzworkingOffice + "(" +row.entity.ZzworkingOfficeName+")"}}</div>',  field: 'ZzworkingOffice', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },

          //      { name: 'Time Keeper ID', field: 'ZztimekeeperId', disableHiding: true, width: "100", headerCellClass: 'gridHead gridCell', cellClass: 'gridCell' },
                                    { name: 'Work Date',  field: 'ZzlineItemDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ZzlineItemDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: "100" },
                 // { name: 'Status', field: 'ZzinvStatus', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100", cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity| statusfilter}}</div>' },
                               { name: 'Status', pinnedLeft: true, field: 'statusmessage', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100", cellTemplate: info },
                                                { name: 'Units', field: 'Units', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },
                                     { name: 'Billed Rate', field: 'ZzbilledRate', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "100" },

                           //      { name: 'Working Office Name', field: 'ZzworkingOfficeName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },
                    //{ name: 'Matter - Matter Description', field: 'matternodesc', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "250" },
                    //                    { name: 'Invoice Number', field: 'invoicestatus', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "400" },


              //   { name: 'Matter Phase Name', field: 'ZzphaseName', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: "200" },




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
            //plugins: [new ngGridFlexibleHeightPlugin()]
        };
        $scope.pendingcount = 0;
        $scope.approvedcount = 0;
        $scope.rejectedcount = 0;
        $scope.reviewcount = 0;
        $scope.holdcount = 0;

        $scope.paidcount = 0;
        $scope.processedcount = 0;
        $scope.apppaymentount = 0;
        $scope.failedcount = 0;

        $scope.getFileList = function (row, $event) {
            lglsystemData.selectedinvoiceNumber = row.ZzinvoiceNumber;
            var modalInstancesettings = $modal.open({
                animation: true,
                backdrop: 'static',
                keyboard: false,
                templateUrl: "views/partials/opendocumentdialog.html",
                size: 'sm',
                bindToController: true,
                controller: "billdocattachments"
            });

            modalInstancesettings.result.then(function (data) {
            }, function () {
            });
        };




        function getDetailinvoice(row) {
            invoiceService.getDetailInvoices(row)
                                .then(function (op_data) {
                                    if (op_data) {
                                        //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                        $scope.invoicesdetaillist = op_data.d.results;
                                        $scope.invoicesdetaillistcopy = angular.copy($scope.invoicesdetaillist);
                                        $scope.detailmode = true;

                                        lglsystemData.detailmode = $scope.detailmode;
                                        $scope.filterOptionColumn()

                                        _.each($scope.invoicesdetaillistcopy, function (item) {
                                            var matternodesc = row.ZzlawFirmMatterId + ' - ' + row.ZzmatterName;
                                            var invoicestatus = row.ZzinvoiceNumber + '(' + $scope.filtergridtype + ')';


                                            $scope.headerline = matternodesc + ', Invoice Number : ' + invoicestatus;

                                            var statuslog = lglsystemData.selectedrow.statuslog;
                                            if (lglsystemData.selectedrow.statusmessage != 'Success') {
                                                var linerow = _.find(statuslog, { 'ZzlineItem': item.ZzlineItemNumber });
                                                if (!_.isUndefined(linerow)) {
                                                    item.statusmessage = "Error";
                                                    if (linerow.MessageLevel == 'L') {
                                                        item.statusmessageinfo = linerow.ZzmessageLog
                                                    }
                                                }
                                            }



                                        });
                                    }

                                });
        }

        $scope.getallInvoices = function getallInvoices(file) {

            invoiceService.getInvoices(file)
                        .then(function (op_data) {
                            if (op_data) {
                                //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                $scope.invoicesmasterlist = op_data.d.results;

                                if ($scope.invoicesmasterlist.length != 0) {

                                    _.each($scope.invoicesmasterlist, function (item) {


                                        invoiceService.getDetailInvoicesstatus(item)
                            .then(function (op_data) {
                                if (op_data) {
                                    item.statuslog = op_data.d.results;
                                   if (item.ZzpayStatus == '') {
                                        
                                        item.statusmessage = "Success";
                                        item.statusmessageinfo = "";
                                        _.each(item.statuslog, function (itemstatus) {
                                            item.statusmessage = "Error";
                                            // if (itemstatus.MessageLevel == 'H') {
                                            item.statusmessageinfo = item.statusmessageinfo + '\n' + itemstatus.ZzmessageLog
                                            //}
                                        });
                                    }
                                    else {
                                    
                                        item.statusmessage = item.ZzpaystatMes;
                                        item.statusmessageinfo = "";
                                    }

                                    $scope.invoicesmasterlistcopy = angular.copy($scope.invoicesmasterlist);


                                    $scope.pendingcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '01'; }).length;
                                    $scope.approvedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '02'; }).length;
                                    $scope.rejectedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '03'; }).length;
                                    $scope.reviewcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '04'; }).length;
                                    $scope.holdcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '05'; }).length;


                                    $scope.paidcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzpayStatus == '01'; }).length;
                                    $scope.processedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzpayStatus == '02'; }).length;
                                    $scope.apppaymentount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzpayStatus == '03'; }).length;
                                    $scope.failedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzpayStatus == '04'; }).length;

                                    $scope.invoicesmasterlistcopy = $filter('filter')($scope.invoicesmasterlistcopy, { ZzinvStatus: '01' });
                                    $scope.gridData.data = $scope.invoicesmasterlistcopy;
                                    if ($scope.filtergridtype == '') {
                                        
                                        $scope.filtergridtype = "pending";
                                        var itemcol = _.find($scope.gridData.columnDefs, function (o) { return o.name == 'Reject Comments' })
                                        if (!_.isUndefined(itemcol)) {
                                            itemcol.visible = false;
                                        }
                                        filtergrid($scope.filtergridtype);
                                    }
                                    else {
                                        filtergrid($scope.filtergridtype);
                                    }

                                }

                            });
                                    });

                                  

                                    //$timeout(function () {
                                    //    if ($scope.gridApi.selection.selectRow) {
                                    //        $scope.gridApi.selection.selectRow($scope.gridData.data[0]);
                                    //    }
                                    //});
                                }
                            }

                        });
        };

        $scope.showFormModal = showFormModal;



        $scope.getInvoiceDetails = function () {
            var itemsFilter = [];
            var filteredQueryArray = [];
            var filteredQueryExcludeArray = [];

            _.each(lglsystemData.invoicenumberfilter, function (item) {




                itemsFilter.push(
                             {
                                 field: 'ZzinvoiceNumber',
                                 search: item,
                                 search1: '',
                                 type: 'equal',
                                 filtertype: 'include',
                                 isand: true
                             }

                             );



            });

            _.each(lglsystemData.matterfilter, function (item) {




                itemsFilter.push(
                             {
                                 field: 'ZzlawFirmMatterId',
                                 search: item,
                                 search1: '',
                                 type: 'equal',
                                 filtertype: 'include',
                                 isand: true
                             }

                             );



            });

            _.each(lglsystemData.vendornumberfilter, function (item) {




                itemsFilter.push(
                             {
                                 field: 'Vendor',
                                 search: item,
                                 search1: '',
                                 type: 'equal',
                                 filtertype: 'include',
                                 isand: true
                             }

                             );



            });



            _.each(itemsFilter, function (item) {

                switch (item.type) {




                    case 'equal':

                        if (!item.isand) {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "(" + item.field + " eq " + "'" + item.search + "')",
                                operator: 'or'
                            });
                        }
                        else {
                            filteredQueryArray.push(
                           {
                               filteredQuery: "(" + item.field + " eq " + "'" + item.search + "')",
                               operator: 'and'
                           });
                        }

                        console.log(filteredQueryArray);
                        break;

                    case 'contains':

                        if (item.filtertype && item.filtertype !== 'exclude') {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "substringof('" + item.search + "'," + "" + item.field + ")",
                                operator: "and"
                            });
                        }
                        else if (item.filtertype && item.filtertype !== 'include') {
                            filteredQueryExcludeArray.push(
                          {
                              filteredQueryExclude: " not substringof('" + item.search + "'," + "" + item.field + ")",
                              operator: "and"
                          });
                        }

                        break;

                    case 'startswith':
                        if (item.filtertype && item.filtertype !== 'exclude') {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "startswith(" + item.field + "," + "'" + item.search + "')",
                                operator: "and"
                            });
                        }
                        else if (item.filtertype && item.filtertype !== 'include') {
                            filteredQueryExcludeArray.push(
                          {
                              filteredQueryExclude: " not startswith(" + item.field + "," + "'" + item.search + "')",
                              operator: "and"
                          });
                        }

                        break;
                    case 'endswith':
                        if (item.filtertype && item.filtertype !== 'exclude') {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "endswith(" + item.field + "," + "'" + item.search + "')",
                                operator: "and"
                            });
                        }
                        else if (item.filtertype && item.filtertype !== 'include') {
                            filteredQueryExcludeArray.push(
                          {
                              filteredQueryExclude: " not endswith(" + item.field + "," + "'" + item.search + "')",
                              operator: "and"
                          });
                        }

                        break;

                    case 'between':

                        if (_.isUndefined(item.isDate)) {
                            if (item.filtertype && item.filtertype !== 'exclude') {
                                filteredQueryArray.push(
                                {
                                    filteredQuery: "((" + item.field + " ge " + "'" + item.search + "') and (" + item.field + " le " + "'" + item.search1 + "'))",
                                    operator: "and"
                                });
                            }
                            else if (item.filtertype && item.filtertype !== 'include') {
                                filteredQueryExcludeArray.push(
                              {
                                  filteredQueryExclude: "(not(" + item.field + " ge " + "'" + item.search + "') and (" + item.field + " le " + "'" + item.search1 + "'))",
                                  operator: "and"
                              });
                            }
                        }
                        else {

                            if (item.filtertype && item.filtertype !== 'exclude') {
                                filteredQueryArray.push(
                                {
                                    filteredQuery: "((" + item.field + " ge datetime" + "'" + item.search + "') and (" + item.field + " le datetime" + "'" + item.search1 + "'))",
                                    operator: "and"
                                });
                            }
                            else if (item.filtertype && item.filtertype !== 'include') {
                                filteredQueryExcludeArray.push(
                              {
                                  filteredQueryExclude: "(not(" + item.field + " ge datetime" + "'" + item.search + "') and (" + item.field + " le datetime" + "'" + item.search1 + "'))",
                                  operator: "and"
                              });
                            }



                        }

                        break;

                    case 'lessthan':
                        if (item.filtertype && item.filtertype !== 'exclude') {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "(" + item.field + " lt " + "'" + item.search + "')",
                                operator: "and"
                            });
                        }
                        else if (item.filtertype && item.filtertype !== 'include') {
                            filteredQueryExcludeArray.push(
                          {
                              filteredQueryExclude: "not (" + item.field + " lt " + "'" + item.search + "')",
                              operator: "and"
                          });
                        }

                        break;

                    case 'lessthanequalto':
                        if (item.filtertype && item.filtertype !== 'exclude') {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "(" + item.field + " le " + "'" + item.search + "')",
                                operator: "and"
                            });
                        }
                        else if (item.filtertype && item.filtertype !== 'include') {
                            filteredQueryExcludeArray.push(
                          {
                              filteredQueryExclude: "not (" + item.field + " le " + "'" + item.search + "')",
                              operator: "and"
                          });
                        }
                        break;

                    case 'greaterthan':
                        if (item.filtertype && item.filtertype !== 'exclude') {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "(" + item.field + " gt " + "'" + item.search + "')",
                                operator: "and"
                            });
                        }
                        else if (item.filtertype && item.filtertype !== 'include') {
                            filteredQueryExcludeArray.push(
                          {
                              filteredQueryExclude: "not (" + item.field + " gt " + "'" + item.search + "')",
                              operator: "and"
                          });
                        }
                        break;

                    case 'greaterthanequalto':
                        if (item.filtertype && item.filtertype !== 'exclude') {
                            filteredQueryArray.push(
                            {
                                filteredQuery: "(" + item.field + " ge " + "'" + item.search + "')",
                                operator: "and"
                            });
                        }
                        else if (item.filtertype && item.filtertype !== 'include') {
                            filteredQueryExcludeArray.push(
                          {
                              filteredQueryExclude: "not (" + item.field + " ge " + "'" + item.search + "')",
                              operator: "and"
                          });
                        }

                        break;


                }


            });

            var filteredQueryArrayDates = [];
            var datefield = 'Erdat';
            var fromdate = $filter('date')(new Date(lglsystemData.wrkdate), 'yyyy-MM-ddT00:00:00');
            var todate = $filter('date')(new Date(lglsystemData.wrkdateto), 'yyyy-MM-ddT00:00:00');
            filteredQueryArrayDates = "((" + datefield + " ge datetime" + "'" + fromdate + "') and (" + datefield + " le datetime" + "'" + todate + "'))";

            invoiceService.getInvoicesFilter(filteredQueryArray, filteredQueryArrayDates)
                .then(function (op_data) {
                    if (op_data) {
                        $scope.invoicesmasterlist = op_data.d.results;
                        console.log( "innn",$scope.invoicesmasterlist);
                        $scope.invoicesmasterlistcopy = angular.copy($scope.invoicesmasterlist);
                        if ($scope.invoicesmasterlistcopy.length != 0) {
                            _.each($scope.invoicesmasterlistcopy, function (item) {


                                invoiceService.getDetailInvoicesstatus(item)
                    .then(function (op_data) {
                        if (op_data) {
                            item.statuslog = op_data.d.results;
                            if (item.ZzpayStatus == '') {
                                
                                item.statusmessage = "Success";
                                item.statusmessageinfo = "";
                                _.each(item.statuslog, function (itemstatus) {
                                    item.statusmessage = "Error";
                                    // if (itemstatus.MessageLevel == 'H') {
                                    item.statusmessageinfo = item.statusmessageinfo + '\n' + itemstatus.ZzmessageLog
                                    //}
                                });
                            }
                            else {
                                
                                item.statusmessage = item.ZzpaystatMes;
                                item.statusmessageinfo = "";
                            }
                            //item.statusmessage = "Success";
                            //item.statusmessageinfo = "";
                            //_.each(item.statuslog, function (itemstatus) {
                            //    item.statusmessage = "Error";
                            //    if (itemstatus.MessageLevel == 'H') {
                            //        item.statusmessageinfo = item.statusmessageinfo + '\n' + itemstatus.ZzmessageLog
                            //    }
                            //});
                            $scope.pendingcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '01'; }).length;
                            $scope.approvedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '02'; }).length;
                            $scope.rejectedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '03'; }).length;
                            $scope.invoicesmasterlistcopy = $filter('filter')($scope.invoicesmasterlistcopy, { ZzinvStatus: '01' });
                            if ($scope.filtergridtype == '') {
                                $scope.filtergridtype = "pending";
                                filtergrid($scope.filtergridtype);
                            }
                            else {
                                filtergrid($scope.filtergridtype);
                            }
                            $scope.gridData.data = $scope.invoicesmasterlistcopy;
                            $timeout(function () {
                                if ($scope.gridApi.selection.selectRow) {
                                    $scope.gridApi.selection.selectRow($scope.gridData.data[0]);
                                }
                            });
                        }

                    });
                            });
                         
                        }
                    }

                });

        };




        function showFormModal(type) {

            if (type === 'filter') {
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/masterFilter.html",
                    size: 'md',

                    bindToController: true,
                    controller: "masterfilterController"

                });

                modalInstancefilter.result.then(function (data) {
                    $scope.getInvoiceDetails();


                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            }

            if (type === 'reject') {
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/reject.html",
                    size: 'md',

                    bindToController: true,
                    controller: "rejectController"

                });

                modalInstancefilter.result.then(function (data) {

                    var message = data.d.Message;
                    if (message) {
                        alert(message);
                        init();
                    }

                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            }





        };

        function init() {
            $scope.filtergridtype = lglsystemData.gridtype;
            // filtergrid($scope.filtergridtype);

            $scope.paymentmode = lglsystemData.paymentmode;
           $scope.paymode =  lglsystemData.paymode;

            // paymentmode($scope.filtergridtype);
            $scope.getallInvoices();
        };
       init();


   

        $scope.filtergrid = filtergrid;
        $scope.filtergridtype = lglsystemData.gridtype;
        function filtergrid(type) {
             
            lglsystemData.gridtype = type;
            $scope.filtergridtype = lglsystemData.gridtype;
           

            $scope.isRowSelected = false;

            var filterdata = angular.copy($scope.invoicesmasterlist);
           
           var item = _.find($scope.gridData.columnDefs, function (o) { return o.name == 'Reject Comments' });
            switch (type) {

                case 'pending': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '01' }); if (!_.isUndefined(item)) { item.visible = false }; $scope.filterOptionColumn(); break;
                case 'approved': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '02' }); if (!_.isUndefined(item)) { item.visible = false }; $scope.filterOptionColumn(); break;
                case 'rejected': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '03' }); if (!_.isUndefined(item)) { item.visible = true }; $scope.filterOptionColumn(); break;
                case 'review': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '04' }); if (!_.isUndefined(item)) { item.visible = true }; $scope.filterOptionColumn(); break;
                case 'hold': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '05' }); if (!_.isUndefined(item)) { item.visible = true }; $scope.filterOptionColumn(); break;

                case 'paid': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzpayStatus: '01' }); if (!_.isUndefined(item)) { item.visible = true }; $scope.filterOptionColumn(); break;
                case 'processed': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzpayStatus: '02' }); if (!_.isUndefined(item)) { item.visible = true }; $scope.filterOptionColumn(); break;
                case 'apppayment': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzpayStatus: '03' }); if (!_.isUndefined(item)) { item.visible = true };; $scope.filterOptionColumn(); break;
                case 'failed': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzpayStatus: '04' }); if (!_.isUndefined(item)) { item.visible = true }; $scope.filterOptionColumn(); break;
            }

            $scope.invoicesdetaillistcopy = [];
        };


        if (!lglsystemData.paymode) {
            
       
        $scope.paymode = false;

        $scope.header = 'My Invoices';
        $scope.headerline = 'Invoice Detail Line item Detail';
        $scope.paymentmode = paymentmode;
    }

        function paymentmode(type) {
            
            lglsystemData.paymentmode = type;
            if (type == 'pay') {
                $scope.paymode = true;
                $scope.filtergrid('paid');
                $scope.header = 'Payment Status';
                $scope.headerline = 'Invoice Detail';
            }
            else {

                $scope.paymode = false;
                $scope.filtergrid('pending');
                $scope.header = 'My Invoices';
                //  $scope.headerline = 'Invoice Detail Line item Detail';
            }
        };


        $scope.createinvoice = createinvoice;



        function createinvoice() {
            var transferitems = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
            invoiceService.createInvoices(transferitems)
                                    .then(function (op_data) {
                                        if (op_data) {
                                            var message = op_data.d.Message;
                                            if (message) {
                                                $mdDialog.show(
$mdDialog.alert()
.title('Invoice')
.textContent(message)
.ariaLabel('Alert Dialog Demo')
.ok('Ok')

);
                                                init();
                                            }
                                        }

                                    });
            //     if (lglsystemData.selectedrow.statusmessage == "Error") {


            //         var confirm = $mdDialog.confirm()
            //.title('Warning')
            //.textContent('Document Contains Error Do you want to Continue?')
            //.ariaLabel('Lucky day')

            //.ok('Yes')
            //.cancel('No');
            //         $mdDialog.show(confirm).then(function () {
            //             invoiceService.createInvoices(lglsystemData.selectedrow)
            //                        .then(function (op_data) {
            //                            if (op_data) {
            //                                var message = op_data.d.Message;
            //                                if (message) {
            //                                    alert(message);
            //                                    init();
            //                                }
            //                            }

            //                        });
            //         }, function () {

            //         });



            //if (!confirm("Document Contains Error Do you want to Continue?")) {

            //}
            //else {
            //    invoiceService.createInvoices(lglsystemData.selectedrow)
            //                .then(function (op_data) {
            //                    if (op_data) {
            //                        var message = op_data.d.Message;
            //                        if (message) {
            //                            alert(message);
            //                            init();
            //                        }
            //                    }

            //                });
            //}
            //}
            //else {
            //    invoiceService.createInvoices(lglsystemData.selectedrow)
            //                  .then(function (op_data) {
            //                      if (op_data) {
            //                          var message = op_data.d.Message;
            //                          if (message) {
            //                              alert(message);
            //                              init();
            //                          }
            //                      }

            //                  });
            //}


        };



        $scope.acceptpending = acceptpending;



        function acceptpending(type) {
            var transferitems = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
            invoiceService.acceptpending(transferitems, type)
                          .then(function (op_data) {
                              if (op_data) {
                                  var message = op_data.d.Message;
                                  if (message) {
                                      $mdDialog.show(
$mdDialog.alert()
.title('Invoice')
.textContent(message)
.ariaLabel('Alert Dialog Demo')
.ok('Ok')

);
                                      init();
                                  }
                              }

                          });

        };



        $scope.filterdata = function () {
            var filterdata = angular.copy($scope.invoicesmasterlist);
            if ($scope.matterdetailsearchinput != '') {


                var filterdatasearch = $filter('filter')(filterdata, $scope.matterdetailsearchinput, undefined);
                switch ($scope.filtergridtype) {
                    case 'pending': $scope.invoicesmasterlistcopy = $filter('filter')(filterdatasearch, { ZzinvStatus: '01' }); break;
                    case 'approved': $scope.invoicesmasterlistcopy = $filter('filter')(filterdatasearch, { ZzinvStatus: '02' }); break;
                    case 'rejected': $scope.invoicesmasterlistcopy = $filter('filter')(filterdatasearch, { ZzinvStatus: '03' }); break;

                }
            }
            else {
                $scope.invoicesmasterlistcopy = angular.copy($scope.invoicesmasterlistcopy);
                switch ($scope.filtergridtype) {
                    case 'pending': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '01' }); break;
                    case 'approved': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '02' }); break;
                    case 'rejected': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '03' }); break;

                }
            }
        };


        $scope.getEditBackgroundColour = function (row) {

            if (row.statusmessage != 'Error') {
                
                return 'selectgreen';
            }
            else {
                return 'selectred';
            }

        }


        //function init() {
        //    getClients();
        //};
        //init();
        $scope.showhideinner = function (e, name) {
            var gridFiltercolumDefShowHideinner = angular.copy($scope.gridDetailsData.columnDefs);
            _.forOwn(gridFiltercolumDefShowHideinner, function (obj) {
                if (obj.field === e && obj.name == name) {
                    if (obj.showhide) {
                        // obj.FiltercolumnDef = [];
                        obj.showhide = false;
                    }
                    else {
                        obj.showhide = true;
                       // console.log('here1')
                        switch (obj.field) {

                            case 'ZzlineItemNumber': obj.FiltercolumnDef = $scope.LI; break;
                            case 'ZztimekeeperId': obj.FiltercolumnDef = $scope.TKID; break;
                            case 'ZztimekeeperName': obj.FiltercolumnDef = $scope.TKName; break;
                            case 'ZzlineItemDate': obj.FiltercolumnDef = $scope.WDate; break;
                            case 'ZzbillingEndDate': obj.FiltercolumnDef = $scope.WED; break;
                            case 'ZzlineItemDate': obj.FiltercolumnDef = $scope.InStatus; break;
                            case 'ZzlineItemDate': obj.FiltercolumnDef = $scope.WO; break;
                            case 'ZzworkingOfficeName': obj.FiltercolumnDef = $scope.WOName; break;
                            case 'Zzphase': obj.FiltercolumnDef = $scope.Mphase; break;
                            case 'ZzphaseName': obj.FiltercolumnDef = $scope.MPhaseName; break;
                            case 'ZzbilledRate': obj.FiltercolumnDef = $scope.BRate; break;
                            case 'ZzagreedRate': obj.FiltercolumnDef = $scope.AgreedRate; break;
                            case 'Units': obj.FiltercolumnDef = $scope.Units; break;
                            case 'Amount': obj.FiltercolumnDef = $scope.Amount; break;
                            case 'Tax': obj.FiltercolumnDef = $scope.Tax; break;
                            case 'Discount': obj.FiltercolumnDef = $scope.Discount; break;
                            case 'AgreedDiscount': obj.FiltercolumnDef = $scope.AgreedDiscount; break;
                            case 'Total': obj.FiltercolumnDef = $scope.Total; break;
                            case 'ZztaskCode': obj.FiltercolumnDef = $scope.TC; break;
                            case 'ZzactivityCode': obj.FiltercolumnDef = $scope.AC; break;
                            case 'ZzlineItemDescription': obj.FiltercolumnDef = $scope.Narrative; break;

                        }
                        var uniqArray = _.map(
                    _.uniq(
                    _.map(obj.FiltercolumnDef, function (ele) {
                        return JSON.stringify(ele);
                    })
                    ), function (ele) {
                        return JSON.parse(ele);
                    });
                        obj.FiltercolumnDef = uniqArray;
                    }
                }
                _.forOwn($scope.filterCheckedArrayinner, function (itm) {
                    if (obj.field === itm.fieldname) {
                        _.forOwn(obj.FiltercolumnDef, function (ele) {
                            if (itm.checkedarray.indexOf(ele.FilterValue) > -1) {

                                ele.IsSelect = true;
                            }
                        })

                    }

                })
            })


            $scope.gridDetailsData.columnDefs = gridFiltercolumDefShowHideinner


        }

        $scope.showhide = function (e, name) {
            var gridFiltercolumDefShowHide = angular.copy($scope.gridData.columnDefs);
            _.forOwn(gridFiltercolumDefShowHide, function (obj) {
                if (obj.field === e && obj.name == name) {
                    if (obj.showhide) {
                        // obj.FiltercolumnDef = [];
                        obj.showhide = false;
                    }
                    else {
                        obj.showhide = true;
                       // console.log('here')
                        switch (obj.field) {

                            case 'Zzebeln': obj.FiltercolumnDef = $scope.PO; break;
                            case 'ZzinvoiceNumber': obj.FiltercolumnDef = $scope.IN; break;
                            case 'ZzinvoiceDate': obj.FiltercolumnDef = $scope.ID; break;
                            case 'ZzbillingStartDate': obj.FiltercolumnDef = $scope.WSD; break;
                            case 'ZzbillingEndDate': obj.FiltercolumnDef = $scope.WED; break;
                            case 'ZzlawFirmMatterId': obj.FiltercolumnDef = $scope.MN; break;
                            case 'ZzmatterName': obj.FiltercolumnDef = $scope.MName; break;
                            case 'ZzrecvDate': obj.FiltercolumnDef = $scope.RD; break;
                            case 'ZzvendorName': obj.FiltercolumnDef = $scope.VID; break;
                            case 'ZzlawFirmTaxid': obj.FiltercolumnDef = $scope.VTID; break;
                            case 'ZzreviewerName': obj.FiltercolumnDef = $scope.Reviewer; break;
                            case 'ZzbillingOfficeName': obj.FiltercolumnDef = $scope.BON; break;
                            case 'Zzdaysoutstanding': obj.FiltercolumnDef = $scope.DOFOS; break;
                            case 'ZzclientId': obj.FiltercolumnDef = $scope.CID; break;
                            case 'ZzclientidName': obj.FiltercolumnDef = $scope.CName; break;
                            case 'Zterm': obj.FiltercolumnDef = $scope.PTerms; break;
                            case 'ZzinvoiceTotal': obj.FiltercolumnDef = $scope.BA; break;
                            case 'ZzinvCurrency': obj.FiltercolumnDef = $scope.Currency; break;
                            case 'ZztaxAmount': obj.FiltercolumnDef = $scope.TA; break;
                            case 'ZzmatterBudget': obj.FiltercolumnDef = $scope.MBA; break;
                            case 'ZzremainBdgt': obj.FiltercolumnDef = $scope.RBA; break;
                            case 'statusmessage': obj.FiltercolumnDef = $scope.Status; break;
                            case 'ZzrejComments': obj.FiltercolumnDef = $scope.RC; break;

                        }
                        var uniqArray = _.map(
                    _.uniq(
                    _.map(obj.FiltercolumnDef, function (ele) {
                        return JSON.stringify(ele);
                    })
                    ), function (ele) {
                        return JSON.parse(ele);
                    });
                        obj.FiltercolumnDef = uniqArray;
                    }
                }
                _.forOwn($scope.filterCheckedArray, function (itm) {
                    if (obj.field === itm.fieldname) {
                        _.forOwn(obj.FiltercolumnDef, function (ele) {
                            if (itm.checkedarray.indexOf(ele.FilterValue) > -1) {

                                ele.IsSelect = true;
                            }
                        })

                    }

                })
            })


            $scope.gridData.columnDefs = gridFiltercolumDefShowHide

        }
        $scope.filterOptionColumn = function () {
          //  console.log(lglsystemData.detailmode)
            if (lglsystemData.detailmode === false) {
                $scope.PO = [], $scope.IN = [], $scope.ID = [], $scope.WSD = [], $scope.WED = [], $scope.MN = [], $scope.MName = [], $scope.RD = [],
                $scope.VID = [], $scope.VTID = [], $scope.Reviewer = [], $scope.BON = [], $scope.DOFOS = [], $scope.CID = [], $scope.CName = [], $scope.PTerms = [],
                $scope.BA = [], $scope.TA = [], $scope.MBA = [], $scope.RBA = [], $scope.Status = [], $scope.Currency = [], $scope.RC = [];
                $scope.filterCheckedArray = [{ fieldname: 'Zzebeln', checkedarray: [] }, { fieldname: 'ZzinvoiceNumber', checkedarray: [] }, { fieldname: 'ZzinvoiceDate', checkedarray: [] }, { fieldname: 'ZzbillingStartDate', checkedarray: [] }, { fieldname: 'ZzbillingEndDate', checkedarray: [] }, { fieldname: 'ZzlawFirmMatterId', checkedarray: [] }, { fieldname: 'ZzmatterName', checkedarray: [] }, { fieldname: 'ZzrecvDate', checkedarray: [] }, { fieldname: 'ZzvendorName', checkedarray: [] }, { fieldname: 'ZzlawFirmTaxid', checkedarray: [] }, { fieldname: 'ZzreviewerName', checkedarray: [] }, { fieldname: 'ZzbillingOfficeName', checkedarray: [] }, { fieldname: 'Zzdaysoutstanding', checkedarray: [] }, { fieldname: 'ZzclientId', checkedarray: [] }, { fieldname: 'ZzclientidName', checkedarray: [] }, { fieldname: 'Zterm', checkedarray: [] }, { fieldname: 'ZzinvoiceTotal', checkedarray: [] }, { fieldname: 'ZzinvCurrency', checkedarray: [] }, { fieldname: 'ZztaxAmount', checkedarray: [] }, { fieldname: 'ZzmatterBudget', checkedarray: [] }, { fieldname: 'ZzremainBdgt', checkedarray: [] }, { fieldname: 'statusmessage', checkedarray: [] }, { fieldname: 'ZzrejComments', checkedarray: [] }];
                $scope.dataforFiltering = angular.copy($scope.invoicesmasterlistcopy);
                $scope.dataforFilteringcopy = angular.copy($scope.invoicesmasterlistcopy);
                //console.log(JSON.stringify($scope.dataforFiltering))
                _.forOwn($scope.dataforFiltering, function (obj) {
                    //if (obj.Kunnr != null && obj.Kunnr != '') {

                    if (obj.Zzebeln != null && obj.Zzebeln != '') {
                        $scope.PO.push({ FilterValue: obj.Zzebeln, filterId: 'Zzebeln' })
                    }
                    if (obj.ZzinvoiceNumber != null && obj.ZzinvoiceNumber != '') {
                        $scope.IN.push({ FilterValue: obj.ZzinvoiceNumber, filterId: 'ZzinvoiceNumber' })
                    }
                    if (obj.ZzinvoiceDate != null && obj.ZzinvoiceDate != '') {
                        $scope.ID.push({ FilterValue: obj.ZzinvoiceDate, filterId: 'ZzinvoiceDate' })
                    }
                    if (obj.ZzbillingStartDate != null && obj.ZzbillingStartDate != '') {
                        $scope.WSD.push({ FilterValue: obj.ZzbillingStartDate, filterId: 'ZzbillingStartDate' })
                    }
                    if (obj.ZzbillingEndDate != null && obj.ZzbillingEndDate != '') {
                        $scope.WED.push({ FilterValue: obj.ZzbillingEndDate, filterId: 'ZzbillingEndDate' })
                    }
                    if (obj.ZzlawFirmMatterId != null && obj.ZzlawFirmMatterId != '') {
                        $scope.MN.push({ FilterValue: obj.ZzlawFirmMatterId, filterId: 'ZzlawFirmMatterId' })
                    }
                    if (obj.ZzmatterName != null && obj.ZzmatterName != '') {
                        $scope.MName.push({ FilterValue: obj.ZzmatterName, filterId: 'ZzmatterName' })
                    }
                    if (obj.ZzrecvDate != null && obj.ZzrecvDate != '') {
                        $scope.RD.push({ FilterValue: obj.ZzrecvDate, filterId: 'ZzrecvDate' })
                    }
                    if (obj.ZzvendorName != null && obj.ZzvendorName != '') {
                        $scope.VID.push({ FilterValue: obj.ZzvendorName, filterId: 'ZzvendorName' })
                    }
                    if (obj.ZzlawFirmTaxid != null && obj.ZzlawFirmTaxid != '') {
                        $scope.VTID.push({ FilterValue: obj.ZzlawFirmTaxid, filterId: 'ZzlawFirmTaxid' })
                    }
                    if (obj.ZzreviewerName != null && obj.ZzreviewerName != '') {
                        $scope.Reviewer.push({ FilterValue: obj.ZzreviewerName, filterId: 'ZzreviewerName' })
                    }
                    if (obj.ZzbillingOfficeName != null && obj.ZzbillingOfficeName != '') {
                        $scope.BON.push({ FilterValue: obj.ZzbillingOfficeName, filterId: 'ZzbillingOfficeName' })
                    }
                    if (obj.Zzdaysoutstanding != null && obj.Zzdaysoutstanding != '') {
                        $scope.DOFOS.push({ FilterValue: obj.Zzdaysoutstanding, filterId: 'Zzdaysoutstanding' })
                    }
                    if (obj.ZzclientId != null && obj.ZzclientId != '') {
                        $scope.CID.push({ FilterValue: obj.ZzclientId, filterId: 'ZzclientId' })
                    }
                    if (obj.ZzclientidName != null && obj.ZzclientidName != '') {
                        $scope.CName.push({ FilterValue: obj.ZzclientidName, filterId: 'ZzclientidName' })
                    }
                    if (obj.Zterm != null && obj.Zterm != '') {
                        $scope.PTerms.push({ FilterValue: obj.Zterm, filterId: 'Zterm' })
                    }
                    if (obj.ZzinvoiceTotal != null && obj.ZzinvoiceTotal != '') {
                        $scope.BA.push({ FilterValue: obj.ZzinvoiceTotal, filterId: 'ZzinvoiceTotal' })
                    }
                    if (obj.ZzinvCurrency != null && obj.ZzinvCurrency != '') {
                        $scope.Currency.push({ FilterValue: obj.ZzinvCurrency, filterId: 'ZzinvCurrency' })
                    }
                    if (obj.ZztaxAmount != null && obj.ZztaxAmount != '') {
                        $scope.TA.push({ FilterValue: obj.ZztaxAmount, filterId: 'ZztaxAmount' })
                    }
                    if (obj.ZzmatterBudget != null && obj.ZzmatterBudget != '') {
                        $scope.MBA.push({ FilterValue: obj.ZzmatterBudget, filterId: 'ZzmatterBudget' })
                    }
                    if (obj.ZzremainBdgt != null && obj.ZzremainBdgt != '') {
                        $scope.RBA.push({ FilterValue: obj.ZzremainBdgt, filterId: 'ZzremainBdgt' })
                    }
                    if (obj.statusmessage != null && obj.statusmessage != '') {
                        $scope.Status.push({ FilterValue: obj.statusmessage, filterId: 'statusmessage' })
                    }
                    if (obj.ZzrejComments != null && obj.ZzrejComments != '') {
                        $scope.RC.push({ FilterValue: obj.ZzrejComments, filterId: 'ZzrejComments' })
                    }
                })
                $scope.gridFiltercolumDef = angular.copy($scope.gridData.columnDefs);
                var gridFiltercolumDefShowHide = angular.copy($scope.gridData.columnDefs);
                _.forOwn(gridFiltercolumDefShowHide, function (obj) {
                    switch (obj.field) {
                        case 'Zzebeln': if ($scope.PO.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvoiceNumber': if ($scope.IN.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvoiceDate': if ($scope.ID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbillingStartDate': if ($scope.WSD.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbillingEndDate': if ($scope.WED.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlawFirmMatterId': if ($scope.MN.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzmatterName': if ($scope.MName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzrecvDate': if ($scope.RD.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzvendorName': if ($scope.VID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlawFirmTaxid': if ($scope.VTID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzreviewerName': if ($scope.Reviewer.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbillingOfficeName': if ($scope.BON.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zzdaysoutstanding': if ($scope.DOFOS.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzclientId': if ($scope.CID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzclientidName': if ($scope.CName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zterm': if ($scope.PTerms.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvoiceTotal': if ($scope.BA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvCurrency': if ($scope.Currency.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztaxAmount': if ($scope.TA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzmatterBudget': if ($scope.MBA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzremainBdgt': if ($scope.RBA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'statusmessage': if ($scope.Status.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzrejComments': if ($scope.RC.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    }
                })
                $scope.gridData.columnDefs = gridFiltercolumDefShowHide
            }
            else {
                $scope.LI = [], $scope.TKID = [], $scope.TKName = [], $scope.WDate = [], $scope.InStatus = [], $scope.WO = [], $scope.WOName = [],
                $scope.Mphase = [], $scope.MPhaseName = [], $scope.BRate = [], $scope.AgreedRate = [], $scope.Units = [], $scope.Amount = [], $scope.Tax = [], $scope.Discount = [],
                $scope.AgreedDiscount = [], $scope.Total = [], $scope.TC = [], $scope.AC = [], $scope.AT = [], $scope.Narrative = [];
                $scope.filterCheckedArrayinner = [{ fieldname: 'ZzbilledRate', checkedarray: [] }, { fieldname: 'ZzlineItemNumber', checkedarray: [] }, { fieldname: 'ZztimekeeperId', checkedarray: [] }, { fieldname: 'ZztimekeeperName', checkedarray: [] }, { fieldname: 'ZzlineItemDate', checkedarray: [] }, { fieldname: 'statusmessage', checkedarray: [] }, { fieldname: 'ZzworkingOffice', checkedarray: [] }, { fieldname: 'ZzworkingOfficeName', checkedarray: [] }, { fieldname: 'Zzphase', checkedarray: [] }, { fieldname: 'ZzphaseName', checkedarray: [] }, { fieldname: 'ZzbilledRate', checkedarray: [] }, { fieldname: 'ZzagreedRate', checkedarray: [] }, { fieldname: 'Units', checkedarray: [] }, { fieldname: 'Amount', checkedarray: [] }, { fieldname: 'Tax', checkedarray: [] }, { fieldname: 'Discount', checkedarray: [] }, { fieldname: 'AgreedDiscount', checkedarray: [] }, { fieldname: 'Total', checkedarray: [] }, { fieldname: 'ZztaskCode', checkedarray: [] }, { fieldname: 'ZzactivityCode', checkedarray: [] }, { fieldname: 'Zzlstar', checkedarray: [] }, { fieldname: 'ZzlineItemDescription', checkedarray: [] }];
                $scope.dataforFilteringinnergrid = angular.copy($scope.invoicesdetaillistcopy);
                $scope.dataforFilteringinnergridcopy = angular.copy($scope.invoicesdetaillistcopy);
                //console.log(JSON.stringify($scope.dataforFiltering))
                _.forOwn($scope.dataforFilteringinnergrid, function (obj) {
                    //if (obj.Kunnr != null && obj.Kunnr != '') {

                    if (obj.ZzlineItemNumber != null && obj.ZzlineItemNumber != '') {
                        $scope.LI.push({ FilterValue: obj.ZzlineItemNumber, filterId: 'ZzlineItemNumber' })
                    }
                    if (obj.ZztimekeeperId != null && obj.ZztimekeeperId != '') {
                        $scope.TKID.push({ FilterValue: obj.ZztimekeeperId, filterId: 'ZztimekeeperId' })
                    }
                    if (obj.ZztimekeeperName != null && obj.ZztimekeeperName != '') {
                        $scope.TKName.push({ FilterValue: obj.ZztimekeeperName, filterId: 'ZztimekeeperName' })
                    }
                    if (obj.ZzlineItemDate != null && obj.ZzlineItemDate != '') {
                        $scope.WDate.push({ FilterValue: obj.ZzlineItemDate, filterId: 'ZzlineItemDate' })
                    }
                    if (obj.ZzlineItemDate != null && obj.ZzlineItemDate != '') {
                        $scope.InStatus.push({ FilterValue: obj.ZzlineItemDate, filterId: 'ZzlineItemDate' })
                    }
                    if (obj.ZzlineItemDate != null && obj.ZzlineItemDate != '') {
                        $scope.WO.push({ FilterValue: obj.ZzlineItemDate, filterId: 'ZzlineItemDate' })
                    }
                    if (obj.ZzworkingOfficeName != null && obj.ZzworkingOfficeName != '') {
                        $scope.WOName.push({ FilterValue: obj.ZzworkingOfficeName, filterId: 'ZzworkingOfficeName' })
                    }
                    if (obj.Zzphase != null && obj.Zzphase != '') {
                        $scope.Mphase.push({ FilterValue: obj.Zzphase, filterId: 'Zzphase' })
                    }
                    if (obj.ZzphaseName != null && obj.ZzphaseName != '') {
                        $scope.MPhaseName.push({ FilterValue: obj.ZzphaseName, filterId: 'ZzphaseName' })
                    }
                    if (obj.ZzbilledRate != null && obj.ZzbilledRate != '') {
                        $scope.BRate.push({ FilterValue: obj.ZzbilledRate, filterId: 'ZzbilledRate' })
                    }
                    if (obj.ZzbilledRate != null && obj.ZzbilledRate != '') {
                        $scope.AgreedRate.push({ FilterValue: obj.ZzbilledRate, filterId: 'ZzbilledRate' })
                    }
                    if (obj.Units != null && obj.Units != '') {
                        $scope.Units.push({ FilterValue: obj.Units, filterId: 'Units' })
                    }
                    if (obj.Amount != null && obj.Amount != '') {
                        $scope.Amount.push({ FilterValue: obj.Amount, filterId: 'Amount' })
                    }
                    if (obj.Tax != null && obj.Tax != '') {
                        $scope.Tax.push({ FilterValue: obj.Tax, filterId: 'Tax' })
                    }
                    if (obj.Discount != null && obj.Discount != '') {
                        $scope.Discount.push({ FilterValue: obj.Discount, filterId: 'Discount' })
                    }
                    if (obj.AgreedDiscount != null && obj.AgreedDiscount != '') {
                        $scope.AgreedDiscount.push({ FilterValue: obj.AgreedDiscount, filterId: 'AgreedDiscount' })
                    }
                    if (obj.Total != null && obj.Total != '') {
                        $scope.Total.push({ FilterValue: obj.Total, filterId: 'Total' })
                    }
                    if (obj.ZztaskCode != null && obj.ZztaskCode != '') {
                        $scope.TC.push({ FilterValue: obj.ZztaskCode, filterId: 'ZztaskCode' })
                    }
                    if (obj.ZzactivityCode != null && obj.ZzactivityCode != '') {
                        $scope.AC.push({ FilterValue: obj.ZzactivityCode, filterId: 'ZzactivityCode' })
                    }
                    if (obj.Zzlstar != null && obj.Zzlstar != '') {
                        $scope.AT.push({ FilterValue: obj.Zzlstar, filterId: 'Zzlstar' })
                    }
                    if (obj.ZzlineItemDescription != null && obj.ZzlineItemDescription != '') {
                        $scope.Narrative.push({ FilterValue: obj.ZzlineItemDescription, filterId: 'ZzlineItemDescription' })
                    }

                })
                $scope.gridFiltercolumDefinner = angular.copy($scope.gridDetailsData.columnDefs);
                var gridFiltercolumDefShowHideinner = angular.copy($scope.gridDetailsData.columnDefs);
                _.forOwn(gridFiltercolumDefShowHideinner, function (obj) {
                    switch (obj.field) {
                        case 'ZzlineItemNumber': if ($scope.LI.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztimekeeperId': if ($scope.TKID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztimekeeperName': if ($scope.TKName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDate': if ($scope.WDate.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDate': if ($scope.InStatus.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDate': if ($scope.WO.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzworkingOfficeName': if ($scope.WOName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zzphase': if ($scope.Mphase.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzphaseName': if ($scope.MPhaseName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbilledRate': if ($scope.BRate.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzagreedRate': if ($scope.AgreedRate.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Units': if ($scope.Units.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Amount': if ($scope.Amount.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Tax': if ($scope.Tax.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Discount': if ($scope.Discount.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'AgreedDiscount': if ($scope.AgreedDiscount.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Total': if ($scope.Total.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztaskCode': if ($scope.TC.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzactivityCode': if ($scope.AC.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zzlstar': if ($scope.AT.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDescription': if ($scope.Narrative.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    }
                })
                $scope.gridDetailsData.columnDefs = gridFiltercolumDefShowHideinner
               // console.log(JSON.stringify($scope.gridDetailsData.columnDefs));

            }

        }


        function showFormModal(type) {
            lglsystemData.lsmdetailscolumns = $scope.gridData.columnDefs;
            lglsystemData.lsmdetailsdatacolumns = $scope.gridDetailsData.columnDefs;
            lglsystemData.detailmode = $scope.detailmode;
            // console.log(JSON.stringify(lglsystemData.lsmdetailscolumns));

            if (type === 'addinvoice') {
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/addinvoice.html",
                    size: 'sm',

                    bindToController: true,
                    controller: "addinvoiceController"

                });

                modalInstancefilter.result.then(function (data) {

                    // console.log('here');
                    //var message = data.d.Message;
                    //if (message) {
                    //    alert(message);
                    //    init();
                    //}

                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            }
            // if (type === 'addinvoice1') {
            //     var modalInstancefilter = $modal.open({
            //         animation: true,
            //         backdrop: 'static',
            //         keyboard: false,
            //         templateUrl: "views/partials/addinvoice1.html",
            //         size: 'sm',

            //         bindToController: true,
            //         controller: "addinvoiceController1"

            //     });

            //     modalInstancefilter.result.then(function (data) {

            //         console.log('here');
            //         //var message = data.d.Message;
            //         //if (message) {
            //         //    alert(message);
            //         //    init();
            //         //}

            //     }, function () {
            //         console.log('Modal dismissed at: ' + new Date());
            //     });

            // }

            if (type === 'vendor') {
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/vendormain.html",
                    size: 'lg',

                    bindToController: true,
                    controller: "vendormainController"

                });

                modalInstancefilter.result.then(function (data) {
                    //   $scope.getInvoiceDetails();


                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            }
            if (type === 'reject') {
                var transferitems = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
                lglsystemData.selectedrows = transferitems;
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/reject.html",
                    size: 'md',

                    bindToController: true,
                    controller: "rejectController"

                });

                modalInstancefilter.result.then(function (data) {

                    var message = data.d.Message;
                    if (message) {
                        $mdDialog.show(
                    $mdDialog.alert()
                    .title('Invoice')
                    .textContent(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')

                    );
                        init();
                    }

                }, function () {

                });

            }

            if (type === 'filter') {
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/masterFilter.html",
                    size: 'md',

                    bindToController: true,
                    controller: "masterfilterController"

                });

                modalInstancefilter.result.then(function (data) {
                    $scope.getInvoiceDetails();


                }, function () {

                });

            }

            ///if (type === 'reject') {
            //  var modalInstancefilter = $modal.open({
            //     animation: true,
            //     backdrop: 'static',
            ///     keyboard: false,
            //     templateUrl: "views/partials/reject.html",
            //      size: 'md',

            //       bindToController: true,
            //     controller: "rejectController"

            //    });

            //     modalInstancefilter.result.then(function (data) {

            //     var message = data.d.Message;
            //       if (message) {
            //         alert(message);
            //         init();
            //     }

            //   }, function () {

            //   });

            //  }

            if (type === 'settings') {
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/lsmsettings.html",
                    size: 'sm',

                    bindToController: true,
                    controller: "lsmsettingsController"

                });

                modalInstancefilter.result.then(function (data) {
                    if (lglsystemData.detailmode) {
                        $scope.gridDetailsData.columnDefs = data;
                    }
                    else {
                        $scope.gridData.columnDefs = data;
                    }


                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            }




        };
        $scope.popoverclose = function () {

            $("[data-toggle='popover']").click();
        }

        $scope.chekboxevent = function (value, FId, e) {


            if (e.IsSelect) {
                e.IsSelect = true;
            }
            else {
                e.IsSelect = false;
            }
            _.forOwn($scope.filterCheckedArray, function (ele) {

                if (ele.fieldname == FId) {

                    var arrayche = ele.checkedarray;
                    var indexvalue = arrayche.indexOf(value)
                    if (indexvalue === -1) {

                        ele.checkedarray.push(value)
                    }
                    else {

                        ele.checkedarray.splice(indexvalue, 1);
                    }
                }

            })
            $scope.filterMultipleColumns();
        }
        $scope.checkboxevent = function (value, FId, e) {


            if (e.IsSelect) {
                e.IsSelect = true;
            }
            else {
                e.IsSelect = false;
            }
            _.forOwn($scope.filterCheckedArrayinner, function (ele) {

                if (ele.fieldname == FId) {

                    var arrayche = ele.checkedarray;
                    var indexvalue = arrayche.indexOf(value)
                    if (indexvalue === -1) {

                        ele.checkedarray.push(value)
                    }
                    else {

                        ele.checkedarray.splice(indexvalue, 1);
                    }
                }

            })
            $scope.filterMultipleColumnsinner();
        }
        $scope.filterMultipleColumnsinner = function () {
            var loopexit = true;
            var filteredfieldName = '';
            var filterSubArray = []
            $scope.setValinner = false;
            $scope.finalFilterarrayinner = [];
            $scope.Filterdatafilinner = angular.copy($scope.dataforFilteringinnergridcopy);
            _.forOwn($scope.filterCheckedArrayinner, function (obj) {
                if (obj.checkedarray.length && loopexit) {
                    filteredfieldName = obj.fieldname
                    _.forOwn(obj.checkedarray, function (e) {
                        _.forOwn($scope.Filterdatafilinner, function (ele) {

                            if (e == ele.ZzlineItemNumber || e == ele.ZztimekeeperId || e == ele.ZztimekeeperName || e == ele.ZzlineItemDate || e == ele.ZzbillingEndDate || e == ele.ZzlineItemDate || e == ele.ZzlineItemDate || e == ele.ZzworkingOfficeName || e == ele.Zzphase || e == ele.ZzphaseName || e == ele.ZzbilledRate || e == ele.ZzagreedRate || e == ele.Amount || e === ele.Units || e === ele.Tax || e === ele.Discount || e === ele.AgreedDiscount || e === ele.Total || e === ele.ZztaskCode || e === ele.ZzactivityCode || e === ele.ZzlineItemDescription) {
                                $scope.finalFilterarrayinner.push(ele)
                            }
                        })

                    })
                    $scope.setValinner = true;
                    loopexit = false;
                }
            })
            var i = 0;
            _.forOwn($scope.filterCheckedArrayinner, function (obj) {
                if (obj.checkedarray.length && filteredfieldName != obj.fieldname) {
                    _.forOwn($scope.finalFilterarrayinner, function (ele) {
                        _.forOwn(obj.checkedarray, function (e) {
                            i = i + 1;
                            if (e == ele.ZzlineItemNumber || e == ele.ZztimekeeperId || e == ele.ZztimekeeperName || e == ele.ZzlineItemDate || e == ele.ZzbillingEndDate || e == ele.ZzlineItemDate || e == ele.ZzlineItemDate || e == ele.ZzworkingOfficeName || e == ele.Zzphase || e == ele.ZzphaseName || e == ele.ZzbilledRate || e == ele.ZzagreedRate || e == ele.Amount || e === ele.Units || e === ele.Tax || e === ele.Discount || e === ele.AgreedDiscount || e === ele.Total || e === ele.ZztaskCode || e === ele.ZzactivityCode || e === ele.ZzlineItemDescription) {
                                filterSubArray.push(ele);

                            }

                        })

                    })
                }

            })
            if (filterSubArray.length === 0 && i == 0) {
                filterSubArray = $scope.finalFilterarrayinner;
            }

            var uniqJSON = _.map(
                    _.uniq(
                    _.map(filterSubArray, function (obj) {
                        return JSON.stringify(obj);
                    })
                    ), function (obj) {
                        return JSON.parse(obj);
                    });


          //  console.log(JSON.stringify(uniqJSON))

            if ($scope.setValinner) {

                $scope.invoicesdetaillistcopy = uniqJSON;
            }
            else {
                $scope.invoicesdetaillistcopy = angular.copy($scope.dataforFilteringinnergridcopy);
            }
        }
        $scope.filterMultipleColumns = function () {
            var loopexit = true;
            var filteredfieldName = '';
            var filterSubArray = []
            $scope.setVal = false;
            $scope.finalFilterarray = [];
            $scope.Filterdatafil = angular.copy($scope.dataforFilteringcopy);
            _.forOwn($scope.filterCheckedArray, function (obj) {
                if (obj.checkedarray.length && loopexit) {
                    filteredfieldName = obj.fieldname
                    _.forOwn(obj.checkedarray, function (e) {
                        _.forOwn($scope.Filterdatafil, function (ele) {

                            if (e == ele.Zzebeln || e == ele.ZzinvoiceNumber || e == ele.ZzinvoiceDate || e == ele.ZzbillingStartDate || e == ele.ZzbillingEndDate || e == ele.ZzlawFirmMatterId || e == ele.ZzmatterName || e == ele.ZzrecvDate || e == ele.ZzvendorName || e == ele.ZzlawFirmTaxid || e == ele.ZzreviewerName || e == ele.ZzbillingOfficeName || e == ele.Zzdaysoutstanding || e == ele.ZzclientId || e === ele.ZzclientidName || e === ele.Zterm || e === ele.ZzinvoiceTotal || e === ele.ZzinvCurrency || e === ele.ZztaxAmount || e === ele.ZzmatterBudget || e === ele.ZzremainBdgt || e === ele.statusmessage || e === ele.ZzrejComments) {
                                $scope.finalFilterarray.push(ele)
                            }
                        })

                    })
                    $scope.setVal = true;
                    loopexit = false;
                }
            })
            var i = 0;
            _.forOwn($scope.filterCheckedArray, function (obj) {
                if (obj.checkedarray.length && filteredfieldName != obj.fieldname) {
                    _.forOwn($scope.finalFilterarray, function (ele) {
                        _.forOwn(obj.checkedarray, function (e) {
                            i = i + 1;
                            if (e == ele.Zzebeln || e == ele.ZzinvoiceNumber || e == ele.ZzinvoiceDate || e == ele.ZzbillingStartDate || e == ele.ZzbillingEndDate || e == ele.ZzlawFirmMatterId || e == ele.ZzmatterName || e == ele.ZzrecvDate || e == ele.ZzvendorName || e == ele.ZzlawFirmTaxid || e == ele.ZzreviewerName || e == ele.ZzbillingOfficeName || e == ele.Zzdaysoutstanding || e == ele.ZzclientId || e === ele.ZzclientidName || e === ele.Zterm || e === ele.ZzinvoiceTotal || e === ele.ZzinvCurrency || e === ele.ZztaxAmount || e === ele.ZzmatterBudget || e === ele.ZzremainBdgt || e === ele.statusmessage || e === ele.ZzrejComments) {
                                filterSubArray.push(ele);

                            }

                        })

                    })
                }

            })
            if (filterSubArray.length === 0 && i == 0) {
                filterSubArray = $scope.finalFilterarray;
            }

            var uniqJSON = _.map(
                    _.uniq(
                    _.map(filterSubArray, function (obj) {
                        return JSON.stringify(obj);
                    })
                    ), function (obj) {
                        return JSON.parse(obj);
                    });


          //  console.log(JSON.stringify(uniqJSON))

            if ($scope.setVal) {

                $scope.invoicesmasterlistcopy = uniqJSON;
            }
            else {
                $scope.invoicesmasterlistcopy = angular.copy($scope.dataforFilteringcopy);
            }
        }



        $scope.isacceptenable = function () {

            var transferitems = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
            if (transferitems.length > 0) {
                //var ishardcost = _.filter(transferitems, function (o) { return o.Awtyp == 'HARD COST' });
                //if (ishardcost.length > 1) {
                //    return true;
                //}
                //else {
                return true;
                //}
            }
            return false;
        }

        $scope.handleFile = function handleFile(element) {
            var element = document.getElementById('xlf');
            $scope.$apply(function (scope) {
                var f = element.files[0];
                {
                    var reader = new FileReader();
                    var name = f.name;
                    var path = xlf.value;
                    var data = '';
                    reader.onload = function (e) {
                        Upload(name, f);
                    };
                    reader.readAsBinaryString(f);
                }
                xlf.value = '';
            });
        }

        function Upload(name, file) {
            //var exceldata = {};
            //exceldata.Name = name;
            //exceldata.Vbeln = jersiData.selectedrow.Vbeln;
            var sapToken = '';
            $.ajax({
                url: jrconstants.serviceUrl,
                headers: {
                    "X-CSRF-Token": "fetch"
                },

                success: function (data, textStatus, request) {
                    sapToken = request.getResponseHeader('X-CSRF-Token');
                    invoiceService.FileUploadclient(sapToken, file)
                    .then(function (op_data) {
                        if (op_data) {
                            $scope.getallInvoices();
                            //  $scope.filenameuploded = file.name;
                            //var transferitems = $scope.matterDetaillistCopy;
                            //if (!(_.isUndefined(op_data.data))) {
                            //    var results = op_data.data;
                            //    if (op_data) {
                            //        for (var i = 0; i < transferitems.length; i++) {
                            //            var message = results.d.Message;
                            //            transferitems[i].info = message;
                            //            if (transferitems[i].info.indexOf("ERROR") != -1 || transferitems[i].info.indexOf("Error") != -1) {
                            //                transferitems[i].imagedisplay = '/assets/images/img_alert_split-screen.png';
                            //            }
                            //            else {
                            //                transferitems[i].imagedisplay = '/assets/images/alertsuccess.png';
                            //            }
                            //        }
                            //    }
                            //}
                            //                            if (!(_.isUndefined(op_data.error))) {
                            //                                $mdDialog.show(
                            //$mdDialog.alert()
                            //.title('Invoice')
                            //.textContent(op_data.error.message.value)
                            //.ariaLabel('Alert Dialog Demo')
                            //.ok('Ok')

                            //);
                            //for (var i = 0; i < transferitems.length; i++) {
                            //    transferitems[i].info = op_data.error.message.value;
                            //    transferitems[i].imagedisplay = '/assets/images/img_alert_split-screen.png';
                            //}
                            //    }
                        }
                    });
                }
            })
        };

        $scope.handleAttachFile = function handleAttachFile(element) {
            
            var elementattach = document.getElementById('xlfAttach');
            $scope.$apply(function (scope) {
                var f = elementattach.files[0];
                {
                    var reader = new FileReader();
                    var name = f.name;
                    var path = xlfAttach.value;
                    var data = '';
                    reader.onload = function (e) {
                        UploadAttachment(name, f);
                    };
                    reader.readAsBinaryString(f);
                }
                xlfAttach.value = '';
            });
        }


        function UploadAttachment(name, file) {
            lglsystemData.selectedinvoiceNumber = '';
            var exceldata = {};
            exceldata.Name = name;
            var items = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
            exceldata.Vbeln = items[0].ZzinvoiceNumber;

            var sapToken = '';
            $.ajax({
                url: jrconstants.serviceUrl,
                headers: {
                    "X-CSRF-Token": "fetch"
                },

                success: function (data, textStatus, request) {
                    sapToken = request.getResponseHeader('X-CSRF-Token');
                    invoiceService.FileUploadAttachclient(exceldata, sapToken, file)
                    .then(function (op_data) {
                        if (op_data) {
                            $scope.getallInvoices();

                            if (!(_.isUndefined(op_data.data))) {
                                var results = op_data.data;
                                if (op_data) {
                                    var message = results.d.Msg;
                                    $mdDialog.show(
                                    $mdDialog.alert()
                                    .title('Alert')
                                    .textContent(message)
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Ok')
                                    )
                                }
                            }


                        }
                    });
                }
            })
        };

        $scope.showcomments = showcomments;

        function showcomments(comments) {


            lglsystemData.comments = comments;

            var modalInstance = $modal.open({
                animation: true,
                backdrop: 'static',
                keyboard: false,
                templateUrl: "views/partials/rejectcomment.html",
                size: 'sm',
                bindToController: true,
                controller: "rejectcommentController"

            });

            modalInstance.result.then(function (data) {






            }, function () {

            });
        };

        $scope.showhideinner = function (e, name) {
            var gridFiltercolumDefShowHideinner = angular.copy($scope.gridDetailsData.columnDefs);
            _.forOwn(gridFiltercolumDefShowHideinner, function (obj) {
                if (obj.field === e && obj.name == name) {
                    if (obj.showhide) {
                        // obj.FiltercolumnDef = [];
                        obj.showhide = false;
                    }
                    else {
                        obj.showhide = true;
                        switch (obj.field) {

                            case 'ZzlineItemNumber': obj.FiltercolumnDef = $scope.LI; break;
                            case 'ZztimekeeperId': obj.FiltercolumnDef = $scope.TKID; break;
                            case 'ZztimekeeperName': obj.FiltercolumnDef = $scope.TKName; break;
                            case 'ZzlineItemDate': obj.FiltercolumnDef = $scope.WDate; break;
                            case 'ZzbillingEndDate': obj.FiltercolumnDef = $scope.WED; break;
                            case 'ZzlineItemDate': obj.FiltercolumnDef = $scope.InStatus; break;
                            case 'ZzlineItemDate': obj.FiltercolumnDef = $scope.WO; break;
                            case 'ZzworkingOfficeName': obj.FiltercolumnDef = $scope.WOName; break;
                            case 'Zzphase': obj.FiltercolumnDef = $scope.Mphase; break;
                            case 'ZzphaseName': obj.FiltercolumnDef = $scope.MPhaseName; break;
                            case 'ZzbilledRate': obj.FiltercolumnDef = $scope.BRate; break;
                            case 'ZzagreedRate': obj.FiltercolumnDef = $scope.AgreedRate; break;
                            case 'Units': obj.FiltercolumnDef = $scope.Units; break;
                            case 'Amount': obj.FiltercolumnDef = $scope.Amount; break;
                            case 'Tax': obj.FiltercolumnDef = $scope.Tax; break;
                            case 'Discount': obj.FiltercolumnDef = $scope.Discount; break;
                            case 'AgreedDiscount': obj.FiltercolumnDef = $scope.AgreedDiscount; break;
                            case 'Total': obj.FiltercolumnDef = $scope.Total; break;
                            case 'ZztaskCode': obj.FiltercolumnDef = $scope.TC; break;
                            case 'ZzactivityCode': obj.FiltercolumnDef = $scope.AC; break;
                            case 'ZzlineItemDescription': obj.FiltercolumnDef = $scope.Narrative; break;

                        }
                        var uniqArray = _.map(
                    _.uniq(
                    _.map(obj.FiltercolumnDef, function (ele) {
                        return JSON.stringify(ele);
                    })
                    ), function (ele) {
                        return JSON.parse(ele);
                    });
                        obj.FiltercolumnDef = uniqArray;
                    }
                }
                _.forOwn($scope.filterCheckedArrayinner, function (itm) {
                    if (obj.field === itm.fieldname) {
                        _.forOwn(obj.FiltercolumnDef, function (ele) {
                            if (itm.checkedarray.indexOf(ele.FilterValue) > -1) {

                                ele.IsSelect = true;
                            }
                        })

                    }

                })
            })


            $scope.gridDetailsData.columnDefs = gridFiltercolumDefShowHideinner


        }
        $scope.showhide = function (e, name) {
            var gridFiltercolumDefShowHide = angular.copy($scope.gridData.columnDefs);
            _.forOwn(gridFiltercolumDefShowHide, function (obj) {
                if (obj.field === e && obj.name == name) {
                    if (obj.showhide) {
                        // obj.FiltercolumnDef = [];
                        obj.showhide = false;
                    }
                    else {
                        obj.showhide = true;
                      //  console.log('here')
                        switch (obj.field) {

                            case 'Zzebeln': obj.FiltercolumnDef = $scope.PO; break;
                            case 'ZzinvoiceNumber': obj.FiltercolumnDef = $scope.IN; break;
                            case 'ZzinvoiceDate': obj.FiltercolumnDef = $scope.ID; break;
                            case 'ZzbillingStartDate': obj.FiltercolumnDef = $scope.WSD; break;
                            case 'ZzbillingEndDate': obj.FiltercolumnDef = $scope.WED; break;
                            case 'ZzlawFirmMatterId': obj.FiltercolumnDef = $scope.MN; break;
                            case 'ZzmatterName': obj.FiltercolumnDef = $scope.MName; break;
                            case 'ZzrecvDate': obj.FiltercolumnDef = $scope.RD; break;
                            case 'ZzvendorName': obj.FiltercolumnDef = $scope.VID; break;
                            case 'ZzlawFirmTaxid': obj.FiltercolumnDef = $scope.VTID; break;
                            case 'ZzreviewerName': obj.FiltercolumnDef = $scope.Reviewer; break;
                            case 'ZzbillingOfficeName': obj.FiltercolumnDef = $scope.BON; break;
                            case 'Zzdaysoutstanding': obj.FiltercolumnDef = $scope.DOFOS; break;
                            case 'ZzclientId': obj.FiltercolumnDef = $scope.CID; break;
                            case 'ZzclientidName': obj.FiltercolumnDef = $scope.CName; break;
                            case 'Zterm': obj.FiltercolumnDef = $scope.PTerms; break;
                            case 'ZzinvoiceTotal': obj.FiltercolumnDef = $scope.BA; break;
                            case 'ZzinvCurrency': obj.FiltercolumnDef = $scope.Currency; break;
                            case 'ZztaxAmount': obj.FiltercolumnDef = $scope.TA; break;
                            case 'ZzmatterBudget': obj.FiltercolumnDef = $scope.MBA; break;
                            case 'ZzremainBdgt': obj.FiltercolumnDef = $scope.RBA; break;
                            case 'statusmessage': obj.FiltercolumnDef = $scope.Status; break;
                            case 'ZzrejComments': obj.FiltercolumnDef = $scope.RC; break;

                        }
                        var uniqArray = _.map(
                    _.uniq(
                    _.map(obj.FiltercolumnDef, function (ele) {
                        return JSON.stringify(ele);
                    })
                    ), function (ele) {
                        return JSON.parse(ele);
                    });
                        obj.FiltercolumnDef = uniqArray;
                    }
                }
                _.forOwn($scope.filterCheckedArray, function (itm) {
                    if (obj.field === itm.fieldname) {
                        _.forOwn(obj.FiltercolumnDef, function (ele) {
                            if (itm.checkedarray.indexOf(ele.FilterValue) > -1) {

                                ele.IsSelect = true;
                            }
                        })

                    }

                })
            })


            $scope.gridData.columnDefs = gridFiltercolumDefShowHide

        }
        $scope.filterOptionColumn = function () {
           // console.log(lglsystemData.detailmode)
            if (lglsystemData.detailmode === false) {
                $scope.PO = [], $scope.IN = [], $scope.ID = [], $scope.WSD = [], $scope.WED = [], $scope.MN = [], $scope.MName = [], $scope.RD = [],
                $scope.VID = [], $scope.VTID = [], $scope.Reviewer = [], $scope.BON = [], $scope.DOFOS = [], $scope.CID = [], $scope.CName = [], $scope.PTerms = [],
                $scope.BA = [], $scope.TA = [], $scope.MBA = [], $scope.RBA = [], $scope.Status = [], $scope.Currency = [], $scope.RC = [];
                $scope.filterCheckedArray = [{ fieldname: 'Zzebeln', checkedarray: [] }, { fieldname: 'ZzinvoiceNumber', checkedarray: [] }, { fieldname: 'ZzinvoiceDate', checkedarray: [] }, { fieldname: 'ZzbillingStartDate', checkedarray: [] }, { fieldname: 'ZzbillingEndDate', checkedarray: [] }, { fieldname: 'ZzlawFirmMatterId', checkedarray: [] }, { fieldname: 'ZzmatterName', checkedarray: [] }, { fieldname: 'ZzrecvDate', checkedarray: [] }, { fieldname: 'ZzvendorName', checkedarray: [] }, { fieldname: 'ZzlawFirmTaxid', checkedarray: [] }, { fieldname: 'ZzreviewerName', checkedarray: [] }, { fieldname: 'ZzbillingOfficeName', checkedarray: [] }, { fieldname: 'Zzdaysoutstanding', checkedarray: [] }, { fieldname: 'ZzclientId', checkedarray: [] }, { fieldname: 'ZzclientidName', checkedarray: [] }, { fieldname: 'Zterm', checkedarray: [] }, { fieldname: 'ZzinvoiceTotal', checkedarray: [] }, { fieldname: 'ZzinvCurrency', checkedarray: [] }, { fieldname: 'ZztaxAmount', checkedarray: [] }, { fieldname: 'ZzmatterBudget', checkedarray: [] }, { fieldname: 'ZzremainBdgt', checkedarray: [] }, { fieldname: 'statusmessage', checkedarray: [] }, { fieldname: 'ZzrejComments', checkedarray: [] }];
                $scope.dataforFiltering = angular.copy($scope.invoicesmasterlistcopy);
                $scope.dataforFilteringcopy = angular.copy($scope.invoicesmasterlistcopy);
                //console.log(JSON.stringify($scope.dataforFiltering))
                _.forOwn($scope.dataforFiltering, function (obj) {
                    //if (obj.Kunnr != null && obj.Kunnr != '') {

                    if (obj.Zzebeln != null && obj.Zzebeln != '') {
                        $scope.PO.push({ FilterValue: obj.Zzebeln, filterId: 'Zzebeln' })
                    }
                    if (obj.ZzinvoiceNumber != null && obj.ZzinvoiceNumber != '') {
                        $scope.IN.push({ FilterValue: obj.ZzinvoiceNumber, filterId: 'ZzinvoiceNumber' })
                    }
                    if (obj.ZzinvoiceDate != null && obj.ZzinvoiceDate != '') {
                        $scope.ID.push({ FilterValue: obj.ZzinvoiceDate, filterId: 'ZzinvoiceDate' })
                    }
                    if (obj.ZzbillingStartDate != null && obj.ZzbillingStartDate != '') {
                        $scope.WSD.push({ FilterValue: obj.ZzbillingStartDate, filterId: 'ZzbillingStartDate' })
                    }
                    if (obj.ZzbillingEndDate != null && obj.ZzbillingEndDate != '') {
                        $scope.WED.push({ FilterValue: obj.ZzbillingEndDate, filterId: 'ZzbillingEndDate' })
                    }
                    if (obj.ZzlawFirmMatterId != null && obj.ZzlawFirmMatterId != '') {
                        $scope.MN.push({ FilterValue: obj.ZzlawFirmMatterId, filterId: 'ZzlawFirmMatterId' })
                    }
                    if (obj.ZzmatterName != null && obj.ZzmatterName != '') {
                        $scope.MName.push({ FilterValue: obj.ZzmatterName, filterId: 'ZzmatterName' })
                    }
                    if (obj.ZzrecvDate != null && obj.ZzrecvDate != '') {
                        $scope.RD.push({ FilterValue: obj.ZzrecvDate, filterId: 'ZzrecvDate' })
                    }
                    if (obj.ZzvendorName != null && obj.ZzvendorName != '') {
                        $scope.VID.push({ FilterValue: obj.ZzvendorName, filterId: 'ZzvendorName' })
                    }
                    if (obj.ZzlawFirmTaxid != null && obj.ZzlawFirmTaxid != '') {
                        $scope.VTID.push({ FilterValue: obj.ZzlawFirmTaxid, filterId: 'ZzlawFirmTaxid' })
                    }
                    if (obj.ZzreviewerName != null && obj.ZzreviewerName != '') {
                        $scope.Reviewer.push({ FilterValue: obj.ZzreviewerName, filterId: 'ZzreviewerName' })
                    }
                    if (obj.ZzbillingOfficeName != null && obj.ZzbillingOfficeName != '') {
                        $scope.BON.push({ FilterValue: obj.ZzbillingOfficeName, filterId: 'ZzbillingOfficeName' })
                    }
                    if (obj.Zzdaysoutstanding != null && obj.Zzdaysoutstanding != '') {
                        $scope.DOFOS.push({ FilterValue: obj.Zzdaysoutstanding, filterId: 'Zzdaysoutstanding' })
                    }
                    if (obj.ZzclientId != null && obj.ZzclientId != '') {
                        $scope.CID.push({ FilterValue: obj.ZzclientId, filterId: 'ZzclientId' })
                    }
                    if (obj.ZzclientidName != null && obj.ZzclientidName != '') {
                        $scope.CName.push({ FilterValue: obj.ZzclientidName, filterId: 'ZzclientidName' })
                    }
                    if (obj.Zterm != null && obj.Zterm != '') {
                        $scope.PTerms.push({ FilterValue: obj.Zterm, filterId: 'Zterm' })
                    }
                    if (obj.ZzinvoiceTotal != null && obj.ZzinvoiceTotal != '') {
                        $scope.BA.push({ FilterValue: obj.ZzinvoiceTotal, filterId: 'ZzinvoiceTotal' })
                    }
                    if (obj.ZzinvCurrency != null && obj.ZzinvCurrency != '') {
                        $scope.Currency.push({ FilterValue: obj.ZzinvCurrency, filterId: 'ZzinvCurrency' })
                    }
                    if (obj.ZztaxAmount != null && obj.ZztaxAmount != '') {
                        $scope.TA.push({ FilterValue: obj.ZztaxAmount, filterId: 'ZztaxAmount' })
                    }
                    if (obj.ZzmatterBudget != null && obj.ZzmatterBudget != '') {
                        $scope.MBA.push({ FilterValue: obj.ZzmatterBudget, filterId: 'ZzmatterBudget' })
                    }
                    if (obj.ZzremainBdgt != null && obj.ZzremainBdgt != '') {
                        $scope.RBA.push({ FilterValue: obj.ZzremainBdgt, filterId: 'ZzremainBdgt' })
                    }
                    if (obj.statusmessage != null && obj.statusmessage != '') {
                        $scope.Status.push({ FilterValue: obj.statusmessage, filterId: 'statusmessage' })
                    }
                    if (obj.ZzrejComments != null && obj.ZzrejComments != '') {
                        $scope.RC.push({ FilterValue: obj.ZzrejComments, filterId: 'ZzrejComments' })
                    }
                })
                $scope.gridFiltercolumDef = angular.copy($scope.gridData.columnDefs);
                var gridFiltercolumDefShowHide = angular.copy($scope.gridData.columnDefs);
                _.forOwn(gridFiltercolumDefShowHide, function (obj) {
                    switch (obj.field) {
                        case 'Zzebeln': if ($scope.PO.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvoiceNumber': if ($scope.IN.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvoiceDate': if ($scope.ID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbillingStartDate': if ($scope.WSD.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbillingEndDate': if ($scope.WED.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlawFirmMatterId': if ($scope.MN.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzmatterName': if ($scope.MName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzrecvDate': if ($scope.RD.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzvendorName': if ($scope.VID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlawFirmTaxid': if ($scope.VTID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzreviewerName': if ($scope.Reviewer.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbillingOfficeName': if ($scope.BON.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zzdaysoutstanding': if ($scope.DOFOS.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzclientId': if ($scope.CID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzclientidName': if ($scope.CName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zterm': if ($scope.PTerms.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvoiceTotal': if ($scope.BA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzinvCurrency': if ($scope.Currency.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztaxAmount': if ($scope.TA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzmatterBudget': if ($scope.MBA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzremainBdgt': if ($scope.RBA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'statusmessage': if ($scope.Status.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzrejComments': if ($scope.RC.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    }
                })
                $scope.gridData.columnDefs = gridFiltercolumDefShowHide
            }
            else {
                $scope.LI = [], $scope.TKID = [], $scope.TKName = [], $scope.WDate = [], $scope.InStatus = [], $scope.WO = [], $scope.WOName = [],
                $scope.Mphase = [], $scope.MPhaseName = [], $scope.BRate = [], $scope.AgreedRate = [], $scope.Units = [], $scope.Amount = [], $scope.Tax = [], $scope.Discount = [],
                $scope.AgreedDiscount = [], $scope.Total = [], $scope.TC = [], $scope.AC = [], $scope.AT = [], $scope.Narrative = [];
                $scope.filterCheckedArrayinner = [{ fieldname: 'ZzbilledRate', checkedarray: [] }, { fieldname: 'ZzlineItemNumber', checkedarray: [] }, { fieldname: 'ZztimekeeperId', checkedarray: [] }, { fieldname: 'ZztimekeeperName', checkedarray: [] }, { fieldname: 'ZzlineItemDate', checkedarray: [] }, { fieldname: 'statusmessage', checkedarray: [] }, { fieldname: 'ZzworkingOffice', checkedarray: [] }, { fieldname: 'ZzworkingOfficeName', checkedarray: [] }, { fieldname: 'Zzphase', checkedarray: [] }, { fieldname: 'ZzphaseName', checkedarray: [] }, { fieldname: 'ZzbilledRate', checkedarray: [] }, { fieldname: 'ZzagreedRate', checkedarray: [] }, { fieldname: 'Units', checkedarray: [] }, { fieldname: 'Amount', checkedarray: [] }, { fieldname: 'Tax', checkedarray: [] }, { fieldname: 'Discount', checkedarray: [] }, { fieldname: 'AgreedDiscount', checkedarray: [] }, { fieldname: 'Total', checkedarray: [] }, { fieldname: 'ZztaskCode', checkedarray: [] }, { fieldname: 'ZzactivityCode', checkedarray: [] }, { fieldname: 'Zzlstar', checkedarray: [] }, { fieldname: 'ZzlineItemDescription', checkedarray: [] }];
                $scope.dataforFilteringinnergrid = angular.copy($scope.invoicesdetaillistcopy);
                $scope.dataforFilteringinnergridcopy = angular.copy($scope.invoicesdetaillistcopy);
                //console.log(JSON.stringify($scope.dataforFiltering))
                _.forOwn($scope.dataforFilteringinnergrid, function (obj) {
                    //if (obj.Kunnr != null && obj.Kunnr != '') {

                    if (obj.ZzlineItemNumber != null && obj.ZzlineItemNumber != '') {
                        $scope.LI.push({ FilterValue: obj.ZzlineItemNumber, filterId: 'ZzlineItemNumber' })
                    }
                    if (obj.ZztimekeeperId != null && obj.ZztimekeeperId != '') {
                        $scope.TKID.push({ FilterValue: obj.ZztimekeeperId, filterId: 'ZztimekeeperId' })
                    }
                    if (obj.ZztimekeeperName != null && obj.ZztimekeeperName != '') {
                        $scope.TKName.push({ FilterValue: obj.ZztimekeeperName, filterId: 'ZztimekeeperName' })
                    }
                    if (obj.ZzlineItemDate != null && obj.ZzlineItemDate != '') {
                        $scope.WDate.push({ FilterValue: obj.ZzlineItemDate, filterId: 'ZzlineItemDate' })
                    }
                    if (obj.ZzlineItemDate != null && obj.ZzlineItemDate != '') {
                        $scope.InStatus.push({ FilterValue: obj.ZzlineItemDate, filterId: 'ZzlineItemDate' })
                    }
                    if (obj.ZzlineItemDate != null && obj.ZzlineItemDate != '') {
                        $scope.WO.push({ FilterValue: obj.ZzlineItemDate, filterId: 'ZzlineItemDate' })
                    }
                    if (obj.ZzworkingOfficeName != null && obj.ZzworkingOfficeName != '') {
                        $scope.WOName.push({ FilterValue: obj.ZzworkingOfficeName, filterId: 'ZzworkingOfficeName' })
                    }
                    if (obj.Zzphase != null && obj.Zzphase != '') {
                        $scope.Mphase.push({ FilterValue: obj.Zzphase, filterId: 'Zzphase' })
                    }
                    if (obj.ZzphaseName != null && obj.ZzphaseName != '') {
                        $scope.MPhaseName.push({ FilterValue: obj.ZzphaseName, filterId: 'ZzphaseName' })
                    }
                    if (obj.ZzbilledRate != null && obj.ZzbilledRate != '') {
                        $scope.BRate.push({ FilterValue: obj.ZzbilledRate, filterId: 'ZzbilledRate' })
                    }
                    if (obj.ZzbilledRate != null && obj.ZzbilledRate != '') {
                        $scope.AgreedRate.push({ FilterValue: obj.ZzbilledRate, filterId: 'ZzbilledRate' })
                    }
                    if (obj.Units != null && obj.Units != '') {
                        $scope.Units.push({ FilterValue: obj.Units, filterId: 'Units' })
                    }
                    if (obj.Amount != null && obj.Amount != '') {
                        $scope.Amount.push({ FilterValue: obj.Amount, filterId: 'Amount' })
                    }
                    if (obj.Tax != null && obj.Tax != '') {
                        $scope.Tax.push({ FilterValue: obj.Tax, filterId: 'Tax' })
                    }
                    if (obj.Discount != null && obj.Discount != '') {
                        $scope.Discount.push({ FilterValue: obj.Discount, filterId: 'Discount' })
                    }
                    if (obj.AgreedDiscount != null && obj.AgreedDiscount != '') {
                        $scope.AgreedDiscount.push({ FilterValue: obj.AgreedDiscount, filterId: 'AgreedDiscount' })
                    }
                    if (obj.Total != null && obj.Total != '') {
                        $scope.Total.push({ FilterValue: obj.Total, filterId: 'Total' })
                    }
                    if (obj.ZztaskCode != null && obj.ZztaskCode != '') {
                        $scope.TC.push({ FilterValue: obj.ZztaskCode, filterId: 'ZztaskCode' })
                    }
                    if (obj.ZzactivityCode != null && obj.ZzactivityCode != '') {
                        $scope.AC.push({ FilterValue: obj.ZzactivityCode, filterId: 'ZzactivityCode' })
                    }
                    if (obj.Zzlstar != null && obj.Zzlstar != '') {
                        $scope.AT.push({ FilterValue: obj.Zzlstar, filterId: 'Zzlstar' })
                    }
                    if (obj.ZzlineItemDescription != null && obj.ZzlineItemDescription != '') {
                        $scope.Narrative.push({ FilterValue: obj.ZzlineItemDescription, filterId: 'ZzlineItemDescription' })
                    }

                })
                $scope.gridFiltercolumDefinner = angular.copy($scope.gridDetailsData.columnDefs);
                var gridFiltercolumDefShowHideinner = angular.copy($scope.gridDetailsData.columnDefs);
                _.forOwn(gridFiltercolumDefShowHideinner, function (obj) {
                    switch (obj.field) {
                        case 'ZzlineItemNumber': if ($scope.LI.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztimekeeperId': if ($scope.TKID.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztimekeeperName': if ($scope.TKName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDate': if ($scope.WDate.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDate': if ($scope.InStatus.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDate': if ($scope.WO.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzworkingOfficeName': if ($scope.WOName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zzphase': if ($scope.Mphase.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzphaseName': if ($scope.MPhaseName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzbilledRate': if ($scope.BRate.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzagreedRate': if ($scope.AgreedRate.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Units': if ($scope.Units.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Amount': if ($scope.Amount.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Tax': if ($scope.Tax.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Discount': if ($scope.Discount.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'AgreedDiscount': if ($scope.AgreedDiscount.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Total': if ($scope.Total.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZztaskCode': if ($scope.TC.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzactivityCode': if ($scope.AC.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'Zzlstar': if ($scope.AT.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                        case 'ZzlineItemDescription': if ($scope.Narrative.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    }
                })
                $scope.gridDetailsData.columnDefs = gridFiltercolumDefShowHideinner
               // console.log(JSON.stringify($scope.gridDetailsData.columnDefs));

            }

        }



        $scope.chekboxevent = function (value, FId, e) {


            if (e.IsSelect) {
                e.IsSelect = true;
            }
            else {
                e.IsSelect = false;
            }
            _.forOwn($scope.filterCheckedArray, function (ele) {

                if (ele.fieldname == FId) {

                    var arrayche = ele.checkedarray;
                    var indexvalue = arrayche.indexOf(value)
                    if (indexvalue === -1) {

                        ele.checkedarray.push(value)
                    }
                    else {

                        ele.checkedarray.splice(indexvalue, 1);
                    }
                }

            })
            $scope.filterMultipleColumns();
        }
        $scope.checkboxevent = function (value, FId, e) {


            if (e.IsSelect) {
                e.IsSelect = true;
            }
            else {
                e.IsSelect = false;
            }
            _.forOwn($scope.filterCheckedArrayinner, function (ele) {

                if (ele.fieldname == FId) {

                    var arrayche = ele.checkedarray;
                    var indexvalue = arrayche.indexOf(value)
                    if (indexvalue === -1) {

                        ele.checkedarray.push(value)
                    }
                    else {

                        ele.checkedarray.splice(indexvalue, 1);
                    }
                }

            })
            $scope.filterMultipleColumnsinner();
        }
        $scope.filterMultipleColumnsinner = function () {
            var loopexit = true;
            var filteredfieldName = '';
            var filterSubArray = []
            $scope.setValinner = false;
            $scope.finalFilterarrayinner = [];
            $scope.Filterdatafilinner = angular.copy($scope.dataforFilteringinnergridcopy);
            _.forOwn($scope.filterCheckedArrayinner, function (obj) {
                if (obj.checkedarray.length && loopexit) {
                    filteredfieldName = obj.fieldname
                    _.forOwn(obj.checkedarray, function (e) {
                        _.forOwn($scope.Filterdatafilinner, function (ele) {

                            if (e == ele.ZzlineItemNumber || e == ele.ZztimekeeperId || e == ele.ZztimekeeperName || e == ele.ZzlineItemDate || e == ele.ZzbillingEndDate || e == ele.ZzlineItemDate || e == ele.ZzlineItemDate || e == ele.ZzworkingOfficeName || e == ele.Zzphase || e == ele.ZzphaseName || e == ele.ZzbilledRate || e == ele.ZzagreedRate || e == ele.Amount || e === ele.Units || e === ele.Tax || e === ele.Discount || e === ele.AgreedDiscount || e === ele.Total || e === ele.ZztaskCode || e === ele.ZzactivityCode || e === ele.ZzlineItemDescription) {
                                $scope.finalFilterarrayinner.push(ele)
                            }
                        })

                    })
                    $scope.setValinner = true;
                    loopexit = false;
                }
            })
            var i = 0;
            _.forOwn($scope.filterCheckedArrayinner, function (obj) {
                if (obj.checkedarray.length && filteredfieldName != obj.fieldname) {
                    _.forOwn($scope.finalFilterarrayinner, function (ele) {
                        _.forOwn(obj.checkedarray, function (e) {
                            i = i + 1;
                            if (e == ele.ZzlineItemNumber || e == ele.ZztimekeeperId || e == ele.ZztimekeeperName || e == ele.ZzlineItemDate || e == ele.ZzbillingEndDate || e == ele.ZzlineItemDate || e == ele.ZzlineItemDate || e == ele.ZzworkingOfficeName || e == ele.Zzphase || e == ele.ZzphaseName || e == ele.ZzbilledRate || e == ele.ZzagreedRate || e == ele.Amount || e === ele.Units || e === ele.Tax || e === ele.Discount || e === ele.AgreedDiscount || e === ele.Total || e === ele.ZztaskCode || e === ele.ZzactivityCode || e === ele.ZzlineItemDescription) {
                                filterSubArray.push(ele);

                            }

                        })

                    })
                }

            })
            if (filterSubArray.length === 0 && i == 0) {
                filterSubArray = $scope.finalFilterarrayinner;
            }

            var uniqJSON = _.map(
                    _.uniq(
                    _.map(filterSubArray, function (obj) {
                        return JSON.stringify(obj);
                    })
                    ), function (obj) {
                        return JSON.parse(obj);
                    });


           // console.log(JSON.stringify(uniqJSON))

            if ($scope.setValinner) {

                $scope.invoicesdetaillistcopy = uniqJSON;
            }
            else {
                $scope.invoicesdetaillistcopy = angular.copy($scope.dataforFilteringinnergridcopy);
            }
        }
        $scope.filterMultipleColumns = function () {
            var loopexit = true;
            var filteredfieldName = '';
            var filterSubArray = []
            $scope.setVal = false;
            $scope.finalFilterarray = [];
            $scope.Filterdatafil = angular.copy($scope.dataforFilteringcopy);
            _.forOwn($scope.filterCheckedArray, function (obj) {
                if (obj.checkedarray.length && loopexit) {
                    filteredfieldName = obj.fieldname
                    _.forOwn(obj.checkedarray, function (e) {
                        _.forOwn($scope.Filterdatafil, function (ele) {

                            if (e == ele.Zzebeln || e == ele.ZzinvoiceNumber || e == ele.ZzinvoiceDate || e == ele.ZzbillingStartDate || e == ele.ZzbillingEndDate || e == ele.ZzlawFirmMatterId || e == ele.ZzmatterName || e == ele.ZzrecvDate || e == ele.ZzvendorName || e == ele.ZzlawFirmTaxid || e == ele.ZzreviewerName || e == ele.ZzbillingOfficeName || e == ele.Zzdaysoutstanding || e == ele.ZzclientId || e === ele.ZzclientidName || e === ele.Zterm || e === ele.ZzinvoiceTotal || e === ele.ZzinvCurrency || e === ele.ZztaxAmount || e === ele.ZzmatterBudget || e === ele.ZzremainBdgt || e === ele.statusmessage || e === ele.ZzrejComments) {
                                $scope.finalFilterarray.push(ele)
                            }
                        })

                    })
                    $scope.setVal = true;
                    loopexit = false;
                }
            })
            var i = 0;
            _.forOwn($scope.filterCheckedArray, function (obj) {
                if (obj.checkedarray.length && filteredfieldName != obj.fieldname) {
                    _.forOwn($scope.finalFilterarray, function (ele) {
                        _.forOwn(obj.checkedarray, function (e) {
                            i = i + 1;
                            if (e == ele.Zzebeln || e == ele.ZzinvoiceNumber || e == ele.ZzinvoiceDate || e == ele.ZzbillingStartDate || e == ele.ZzbillingEndDate || e == ele.ZzlawFirmMatterId || e == ele.ZzmatterName || e == ele.ZzrecvDate || e == ele.ZzvendorName || e == ele.ZzlawFirmTaxid || e == ele.ZzreviewerName || e == ele.ZzbillingOfficeName || e == ele.Zzdaysoutstanding || e == ele.ZzclientId || e === ele.ZzclientidName || e === ele.Zterm || e === ele.ZzinvoiceTotal || e === ele.ZzinvCurrency || e === ele.ZztaxAmount || e === ele.ZzmatterBudget || e === ele.ZzremainBdgt || e === ele.statusmessage || e === ele.ZzrejComments) {
                                filterSubArray.push(ele);

                            }

                        })

                    })
                }

            })
            if (filterSubArray.length === 0 && i == 0) {
                filterSubArray = $scope.finalFilterarray;
            }

            var uniqJSON = _.map(
                    _.uniq(
                    _.map(filterSubArray, function (obj) {
                        return JSON.stringify(obj);
                    })
                    ), function (obj) {
                        return JSON.parse(obj);
                    });


          //  console.log(JSON.stringify(uniqJSON))

            if ($scope.setVal) {

                $scope.invoicesmasterlistcopy = uniqJSON;
            }
            else {
                $scope.invoicesmasterlistcopy = angular.copy($scope.dataforFilteringcopy);
            }
        }
        $scope.filterRemoveItem = function (e, FN) {

            _.forOwn($scope.filterCheckedArray, function (ele) {
                if (ele.fieldname === FN) {
                    var arrayche = ele.checkedarray;
                    var indexvalue = arrayche.indexOf(e)
                    if (indexvalue != -1) {
                        ele.checkedarray.splice(indexvalue, 1);
                        var uncheckcheckbox = angular.copy($scope.gridData.columnDefs);
                        _.forOwn(uncheckcheckbox, function (element) {
                            if (element.FiltercolumnDef) {
                                _.forOwn(element.FiltercolumnDef, function (obj) {
                                    if (e == obj.FilterValue) {
                                        obj.IsSelect = false;
                                    }
                                })
                            }
                        })
                        $scope.gridData.columnDefs = uncheckcheckbox;

                        $scope.filterMultipleColumns();
                    }
                }

            })

        }
        $scope.filterRemoveIteminner = function (e, FN) {

            _.forOwn($scope.filterCheckedArrayinner, function (ele) {
                if (ele.fieldname === FN) {
                    var arrayche = ele.checkedarray;
                    var indexvalue = arrayche.indexOf(e)
                    if (indexvalue != -1) {
                        ele.checkedarray.splice(indexvalue, 1);
                        var uncheckcheckbox = angular.copy($scope.gridDetailsData.columnDefs);
                        _.forOwn(uncheckcheckbox, function (element) {
                            if (element.FiltercolumnDef) {
                                _.forOwn(element.FiltercolumnDef, function (obj) {
                                    if (e == obj.FilterValue) {
                                        obj.IsSelect = false;
                                    }
                                })
                            }
                        })
                        $scope.gridDetailsData.columnDefs = uncheckcheckbox;

                        $scope.filterMultipleColumnsinner();
                    }
                }

            })

        }


    }

})();
