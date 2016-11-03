(function () {
    'use strict';

    angular
    	.module('lglsystem')
    	.controller('vendormainController', vendormainController);

    vendormainController.$inject = ['$scope', '$filter', 'invoiceService', '$modal', '$timeout', 'lglsystemData', 'jrconstants'];

    function vendormainController($scope, $filter, invoiceService, $modal, $timeout, lglsystemData, jrconstants) {


        $scope.issideActive = false;
        $scope.dynamicPopover = {
            templateUrl: 'gridfilter.html',
            title: 'Filters'
        };



        $scope.invoicesmasterlist = [];
        $scope.activesideButton = function () {
            $scope.issideActive = !$scope.issideActive;

        }
        $scope.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };

        $scope.invoicesmasterlistcopy = [];
        $scope.checkboxmodel = {};
        $scope.checkboxmodel.clientselectedAll = false;
        var info = '<md-tooltip md-direction="left" ng-if="row.entity.info">{{row.entity.info}}</md-tooltip><img ng-if="row.entity.info"  ng-src="{{row.entity.imagedisplay}}"></img>';
        var statusTemplate = '<md-checkbox ng-model="row.entity.isSelect"></md-checkbox>';
        var statusheaderTemplate = '<md-checkbox type="checkbox" ng-change="grid.appScope.clientcheckAll()" ng-model="grid.appScope.checkboxmodel.clientselectedAll"></md-checkbox>';

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

        $scope.matternumber = '';

        $scope.gridData = {
        
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableColumnResizing: true,
            multiSelect: false,
            enableGridMenu: false,
            rowHeight: 40,
            data: 'invoicesmasterlistcopy',

            columnDefs: [
                { name: '',pinnedLeft: true, enableFiltering: false,  enableCellEdit: false, allowCellFocus: false, headerCellTemplate: statusheaderTemplate, field: 'Kunnr', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: statusTemplate, width: 40 },
             { name: 'info',pinnedLeft: true, enableCellEdit: false, enableFiltering: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: info, width: 50 },
                                                                                   { name: 'Status', pinnedLeft: true,enableFiltering: false, enableCellEdit: false, field: 'Status', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Status| vendorfilter}}</div>', width: 100 },
                                        { name: 'Matter Name',pinnedLeft: true, field: 'Post1', enableCellEdit: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 125 },
                                                                                              { name: 'Timekeeper Name',pinnedLeft: true, enableCellEdit: false, field: 'Sname', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 200 },
                                                            { name: 'Rate',  enableFiltering: false, enableCellEdit: false, field: 'Kbetr', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 75 },
                                                                                                    { name: 'Currency', enableFiltering: false, enableCellEdit: false, field: 'Konwa', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },

                                                           { name: 'Matter', enableCellEdit: false, field: 'Pspid', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 200 },

                { name: 'TimeKeeper', field: 'Pernr', enableCellEdit: false, disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 200 },
                    //{
                    //    name: 'Rate', field: 'Kbetr', enableCellEdit: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150
                    //    ,
                    //    cellEditableCondition: function ($scope) {

                    //        return ($scope.row.entity.Status != 'P');
                    //        }
                    //},
                 { name: 'DateFrom', enableFiltering: false, enableCellEdit: false, field: 'Datab', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Datab| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 150 },
                                  { name: 'DateTo', enableFiltering: false, enableCellEdit: false, field: 'Datbi', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Datbi| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 150 },



                                       { name: 'PricingUnit', enableFiltering: false, enableCellEdit: false, field: 'Kpein', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },
                                        { name: 'Unit', enableFiltering: false, enableCellEdit: false, field: 'Kmein', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 150 },


            ]
            // plugins: [new ngGridFlexibleHeightPlugin()]
        };

        $scope.gridData.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var msg = 'row selected ' + row.isSelected;
                lglsystemData.selectedrow = row.entity;
                // getDetailinvoice(row.entity);
            });
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

                rowEntity.Odate = rowEntity.Datab;
                rowEntity.Action = 'ADJ';
                rowEntity.Datab = convertToJSONDate(new Date().toDateString());

                $scope.$apply();
            });

        };

        $scope.filterOptionColumn = function () {
            //  console.log(lglsystemData.detailmode)

            $scope.Status = [], $scope.Matter = [], $scope.TK = [], $scope.Rate = [], $scope.Currency = [], $scope.PU = [], $scope.Unit = [],
                $scope.DF = [], $scope.DT = [], $scope.TKName = [];
            $scope.filterCheckedArray = [{ fieldname: 'Status', checkedarray: [] }, { fieldname: 'Pspid', checkedarray: [] }, { fieldname: 'Pernr', checkedarray: [] }, { fieldname: 'Kbetr', checkedarray: [] }, { fieldname: 'Konwa', checkedarray: [] }, { fieldname: 'Kpein', checkedarray: [] }, { fieldname: 'Kmein', checkedarray: [] }, { fieldname: 'Datab', checkedarray: [] }, { fieldname: 'Datbi', checkedarray: [] }, { fieldname: 'Sname', checkedarray: [] }];
            $scope.dataforFiltering = angular.copy($scope.invoicesmasterlistcopy);
            $scope.dataforFilteringcopy = angular.copy($scope.invoicesmasterlistcopy);
            //console.log(JSON.stringify($scope.dataforFiltering))
            _.forOwn($scope.dataforFiltering, function (obj) {
                //if (obj.Kunnr != null && obj.Kunnr != '') {

                if (obj.Status != null && obj.Status != '') {
                    $scope.Status.push({ FilterValue: obj.Status, filterId: 'Status' })
                }
                if (obj.Pspid != null && obj.Pspid != '') {
                    $scope.Matter.push({ FilterValue: obj.Pspid, filterId: 'Pspid' })
                }
                if (obj.Pernr != null && obj.Pernr != '') {
                    $scope.TK.push({ FilterValue: obj.Pernr, filterId: 'Pernr' })
                }
                if (obj.Kbetr != null && obj.Kbetr != '') {
                    $scope.Rate.push({ FilterValue: obj.Kbetr, filterId: 'Kbetr' })
                }
                if (obj.Konwa != null && obj.Konwa != '') {
                    $scope.Currency.push({ FilterValue: obj.Konwa, filterId: 'Konwa' })
                }
                if (obj.Kpein != null && obj.Kpein != '') {
                    $scope.PU.push({ FilterValue: obj.Kpein, filterId: 'Kpein' })
                }
                if (obj.Kmein != null && obj.Kmein != '') {
                    $scope.Unit.push({ FilterValue: obj.Kmein, filterId: 'Kmein' })
                }
                if (obj.Datab != null && obj.Datab != '') {
                    $scope.DF.push({ FilterValue: obj.Datab, filterId: 'Datab' })
                }
                if (obj.Datbi != null && obj.Datbi != '') {
                    $scope.DT.push({ FilterValue: obj.Datbi, filterId: 'Datbi' })
                }
                if (obj.Sname != null && obj.Sname != '') {
                    $scope.TKName.push({ FilterValue: obj.Sname, filterId: 'Sname' })
                }
            })
            $scope.gridFiltercolumDef = angular.copy($scope.gridData.columnDefs);
            var gridFiltercolumDefShowHide = angular.copy($scope.gridData.columnDefs);
            _.forOwn(gridFiltercolumDefShowHide, function (obj) {
                switch (obj.field) {
                    case 'Status': if ($scope.Status.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Pspid': if ($scope.Matter.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Pernr': if ($scope.TK.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Kbetr': if ($scope.Rate.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Kpein': if ($scope.PU.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Konwa': if ($scope.Currency.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Kmein': if ($scope.Unit.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Datab': if ($scope.DF.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Datbi': if ($scope.DT.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Sname': if ($scope.TKName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                }
            })
            $scope.gridData.columnDefs = gridFiltercolumDefShowHide;

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

                            case 'Status': obj.FiltercolumnDef = $scope.Status; break;
                            case 'Pspid': obj.FiltercolumnDef = $scope.Matter; break;
                            case 'Pernr': obj.FiltercolumnDef = $scope.TK; break;
                            case 'Kbetr': obj.FiltercolumnDef = $scope.Rate; break;
                            case 'Konwa': obj.FiltercolumnDef = $scope.Currency; break;
                            case 'Kpein': obj.FiltercolumnDef = $scope.PU; break;
                            case 'Kmein': obj.FiltercolumnDef = $scope.Unit; break;
                            case 'Datab': obj.FiltercolumnDef = $scope.DF; break;
                            case 'Datbi': obj.FiltercolumnDef = $scope.DT; break;
                            case 'Sname': obj.FiltercolumnDef = $scope.TKName; break;

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
        $scope.popoverclose = function () {

            $("[data-toggle='popover']").click();
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

                            if (e == ele.Status || e == ele.Pspid || e == ele.Pernr || e == ele.Kbetr || e == ele.Konwa || e == ele.Kpein || e == ele.Kmein || e == ele.Datab || e == ele.Datbi || e == ele.Sname) {
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
                            if (e == ele.Status || e == ele.Pspid || e == ele.Pernr || e == ele.Kbetr || e == ele.Konwa || e == ele.Kpein || e == ele.Kmein || e == ele.Datab || e == ele.Datbi || e == ele.Sname) {
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


           

            if ($scope.setVal) {

                $scope.invoicesmasterlistcopy = uniqJSON;
            }
            else {
                $scope.invoicesmasterlistcopy = angular.copy($scope.dataforFilteringcopy);
            }
        }



        $scope.pendingcount = 0;
        $scope.approvedcount = 0;
        $scope.rejectedcount = 0;

        $scope.datamatter = {};
        $scope.getallInvoices = getallInvoices;
        function getallInvoices(data) {
            $scope.datamatter = data;
            $scope.matternumber = data.Kunnr;
            invoiceService.getVendorData(data)
                        .then(function (op_data) {
                            if (op_data) {
                                //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                $scope.invoicesmasterlist = op_data.d.results;
                                $scope.invoicesmasterlistcopy = angular.copy($scope.invoicesmasterlist);
                                $scope.filterOptionColumn();


                            }

                        });
        };

        $scope.showFormModal = showFormModal;


        function loadata(master, detail) {

            var data = [['PO(Client Case Number)', 'Invoice Number', 'Invoice Date', 'Work Start Date', 'Work End Date', 'Matter Number', 'Matter Name', 'Vendor Id', 'Reviewer', 'Days of Outstanding', 'Billed Amount', 'Tax Amount', 'Matter Budget Amount', 'Status', 'Currency'], [true, false, null, "sheetjs"], ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
            var ws_name = "Header";

            var data2 = [['PO(Client Case Number)', 'Line Item', 'Invoice Number', 'Invoice Date', 'TIME KEEPER ID', 'TK Name', 'Work Date', 'Narrative', 'Status', 'Received Date', 'Vendor  ID', 'Vendor Tax Id', 'Working Office', 'Billing Office Name', 'Matter Number', 'Matter Name', 'Client ID(Payer)', 'Client Tax Id', 'Payment Terms', 'Billed Rate', 'Agreed Rate', 'Units', 'Amount Tax', 'Adjustment', 'Discount', 'Agreed Discount', 'Total'], [true, false, null, "sheetjs"], ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
            var ws_name1 = "Detail";

        }



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
                        $scope.invoicesmasterlistcopy = angular.copy($scope.invoicesmasterlist);
                        if ($scope.invoicesmasterlistcopy.length != 0) {

                            $scope.pendingcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '01'; }).length;
                            $scope.approvedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '02'; }).length;
                            $scope.rejectedcount = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.ZzinvStatus == '03'; }).length;
                            $scope.invoicesmasterlistcopy = $filter('filter')($scope.invoicesmasterlistcopy, { ZzinvStatus: '01' });
                            $scope.filtergridtype = "pending";
                            $scope.gridData.data = $scope.invoicesmasterlistcopy;
                            $timeout(function () {
                                if ($scope.gridApi.selection.selectRow) {
                                    $scope.gridApi.selection.selectRow($scope.gridData.data[0]);
                                }
                            });
                        }
                    }

                });

        };




        function showFormModal(type) {

            if (type === 'settings') {
                lglsystemData.settingvariable = 'timekeepersetting';
                lglsystemData.lsmtimekeepercolumns = $scope.gridData.columnDefs;
                var modalInstancefilter = $modal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: "views/partials/lsmtimekeepersettings.html",
                    size: 'sm',

                    bindToController: true,
                    controller: "lsmtimekeepersettingsController"

                });

                modalInstancefilter.result.then(function (data) {

                    $scope.gridData.columnDefs = data;


                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
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
                    }

                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            }





        };

        function init() {
            //  getallInvoices();
            getClients();

        };
        init();

        $scope.filtergrid = filtergrid;

        function filtergrid(type) {
            $scope.filtergridtype = type;
            var filterdata = angular.copy($scope.invoicesmasterlist);
            switch (type) {
                case 'pending': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '01' }); break;
                case 'approved': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '02' }); break;
                case 'rejected': $scope.invoicesmasterlistcopy = $filter('filter')(filterdata, { ZzinvStatus: '03' }); break;

            }
            $scope.invoicesdetaillistcopy = [];
        };









        function getClients() {
            invoiceService.getClients()
                           .then(function (op_data) {
                               if (op_data) {
                                   $scope.clientmaster = op_data.d.results;
                                   $scope.clientmastercopy = angular.copy($scope.clientmaster);
                                   $scope.getallInvoices($scope.clientmastercopy[0]);
                               }

                           });
        };




        $scope.filterdata = function () {
            var filterdata = angular.copy($scope.invoicesmasterlist);
            if ($scope.matterdetailsearchinput != '') {


                var filterdatasearch = $filter('filter')(filterdata, $scope.matterdetailsearchinput, undefined);
                $scope.invoicesmasterlistcopy = filterdatasearch;
            }
            else {
                $scope.invoicesmasterlistcopy = angular.copy(filterdata);

            }
        };



        $scope.exceldatagrid = [];
        // var xlf = document.getElementById('xlf');
        // if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
        var X = XLSX;
        $scope.handleFile = function handleFile(element) {

            //  var files = e.target.files;
            var element = document.getElementById('xlf');

            $scope.$apply(function (scope) {
                var f = element.files[0];
                {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {

                        var data = e.target.result;
                        var arr = fixdata(data);
                        var wb = X.read(btoa(arr), { type: 'base64' });
                        var output = JSON.stringify(to_json(wb), 2, 2);
                        var sheetdata = angular.fromJson(output);
                        formatjsontoupload(sheetdata.Sheet1)
                        //$scope.exceldata = sheetdata.Sheet1;
                        //$scope.exceldatagrid=angular.copy($scope.exceldata);





                        console.log(output);
                    };
                    reader.readAsArrayBuffer(f);
                }
                xlf.value = '';
            });
        }

        function formatjsontoupload(data) {

            var columns = $scope.gridData.columnDefs;
            var headerdata = [];
            _.each(data, function (item) {
                var obj = {};
                _.each(columns, function (itemcols) {

                    if (!_.isUndefined(itemcols.field)) {
                        var colname = itemcols.name.trim();

                        if (!_.isUndefined(item[colname])) {

                            if (itemcols.field == 'Datab' || itemcols.field == 'Datbi') {

                                obj[itemcols.field] = convertToJSONDate(item[colname]);

                            }
                            else {

                                obj[itemcols.field] = item[colname];

                            }
                        }
                        else {
                            obj[itemcols.field] = "";

                        }
                    }




                });
                obj.Kschl = item.Type;
                headerdata.push(obj);


            });
            var refresh = function () {
                $scope.refresh = true;
                $timeout(function () {
                    $scope.refresh = false;
                }, 0);
            };

            //var jsontopost = {};
            //jsontopost["Uname"] = "EXTLPD";
            //jsontopost["CrecToUser"] = [];
            $scope.exceldata = headerdata;
            //jsontopost["CrecToUser"] = headerdata;
            $scope.exceldatagrid = angular.copy($scope.exceldata);
            $scope.invoicesmasterlist = angular.copy($scope.exceldatagrid);
            $scope.invoicesmasterlistcopy = angular.copy($scope.invoicesmasterlist);
            //    $scope.gridData.data = angular.copy($scope.exceldatagrid);
            // $scope.jsontopost = jsontopost;
            $scope.$apply();

        }


        $scope.Upload = Upload;


        function Upload(type) {

            $scope.jsontopost = {};
            $scope.jsontopost["Uname"] = "EXTLPD";
            $scope.jsontopost["CrecToUser"] = [];
            var transferitems = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
            _.each(transferitems, function (item) {
                delete item.imagedisplay;
                delete item.isSelect;
                delete item.info;
                delete item.__metadata;
                item.Action = item.Action || type;
            });
            $scope.jsontopost["CrecToUser"] = transferitems;

            var exceldata = $scope.jsontopost;

            var sapToken = '';
            $.ajax({
                url: jrconstants.serviceUrl,
                headers: {
                    "X-CSRF-Token": "fetch"
                },

                success: function (data, textStatus, request) {

                    sapToken = request.getResponseHeader('X-CSRF-Token');
                    invoiceService.saveclient(exceldata, sapToken)
                               .then(function (op_data) {
                                   if (op_data.data) {
                                       var results = op_data.data.d.CrecToUser.results;
                                       //for (var i = 0; i < transferitems.length; i++) {

                                       //    transferitems[i].info = results[i].Message;
                                       //    if (transferitems[i].info.indexOf("ERROR") != -1) {
                                       //        transferitems[i].imagedisplay = '/assets/images/img_alert_split-screen.png';

                                       //    }
                                       //    else {
                                       //        transferitems[i].imagedisplay = '/assets/images/alertsuccess.png';

                                       //    }
                                       //}

                                       for (var i = 0; i < transferitems.length; i++) {

                                           var item = _.filter($scope.invoicesmasterlistcopy, function (o) { return o == transferitems[i] });

                                           var message = results[i].Message;;
                                           item[0].info = message;
                                           if (item[0].info.indexOf("ERROR") != -1 || item[0].info.indexOf("Error") != -1) {
                                               item[0].imagedisplay = './assets/images/img_alert_split-screen.png';
                                           }
                                           else {
                                               if (results[i].Iserror != 'X') {

                                                   item[0].imagedisplay = './assets/images/alertsuccess.png';
                                               }
                                               else {
                                                   item[0].imagedisplay = './assets/images/img_alert_split-screen.png';
                                               }
                                           }
                                       }

                                   }

                                   if (!(_.isUndefined(op_data.error))) {
                                       for (var i = 0; i < transferitems.length; i++) {
                                           var item = _.filter($scope.invoicesmasterlistcopy, function (o) { return o == transferitems[i] });
                                           item[0].info = op_data.error.message.value;
                                           item[0].imagedisplay = './assets/images/img_alert_split-screen.png';
                                       }
                                   }
                               });

                }
            })




        };


        function fixdata(data) {
            var o = "", l = 0, w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        }
        function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }


        function convertToJSONDate(strDate) {
            var dt = new Date(strDate);
            var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
            return '/Date(' + newDate.getTime() + ')/';
        }

        $scope.isacceptenable = function () {

            var transferitems = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
            if (transferitems.length > 0) {
                //var ishardcost = _.filter(transferitems, function (o) { return o.Status != 'P' });
                //if (ishardcost.length > 1) {
                //    return false;
                //}
                //else {
                return true;
                // }
            }
            return false;
        }
        $scope.isapproveenable = function () {

            var transferitems = _.filter($scope.invoicesmasterlistcopy, function (o) { return o.isSelect });
            if (transferitems.length > 0) {
                var ispen = _.filter(transferitems, function (o) { return o.Status != 'P' });
                if (ispen.length > 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        }


    }

})();
