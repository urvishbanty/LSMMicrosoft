/// <reference path="budjetmain.controller.js" />
(function () {
    'use strict';

    angular
    	.module('lglsystem')
    	.controller('budjetmainController', budjetmainController);

    budjetmainController.$inject = ['$scope', '$filter', 'invoiceService', '$modal', '$timeout', 'lglsystemData', 'jrconstants', '$mdDialog'];

    function budjetmainController($scope, $filter, invoiceService, $modal, $timeout, lglsystemData, jrconstants, $mdDialog) {


        $scope.issideActive = true;
        $scope.dynamicPopover = {
            templateUrl: 'gridfilter.html',
            title: 'Filters'
        };


        $scope.budjetmasterlist = [];
        $scope.activesideButton = function () {
            $scope.issideActive = !$scope.issideActive;

        }
        $scope.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };


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
            angular.forEach($scope.budjetmasterlistcopy, function (item) {
                item.isSelect = $scope.checkboxmodel.clientselectedAll;

            });
        };
        $scope.gridData = {
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableColumnResizing: true,
            multiSelect: false,
            enableGridMenu: false,
            rowHeight: 70,
            data: 'budjetmasterlistcopy',

            columnDefs: [

                { name: '', allowCellFocus: false, enableCellEdit: false, pinnedLeft: true, headerCellTemplate: statusheaderTemplate, field: 'Bukrs', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: statusTemplate, width: 40 },

            { name: 'info', allowCellFocus: false, enableCellEdit: false, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: info, width: 100 },
                                                          { name: 'RecordType', visible: false, displayName: 'RecordType', enableCellEdit: false, field: 'RecordType', disableHiding: true, headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', width: 150 },

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
        };
        $scope.gridData.enableCellEditOnFocus = true;
        $scope.getallbudjets = getallbudjets;
        function getallbudjets(data) {
            invoiceService.getBudjetData(data)
                        .then(function (op_data) {
                            if (op_data) {
                                //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                $scope.budjetmasterlist = op_data.d.results;
                                $scope.budjetmasterlistcopy = angular.copy($scope.budjetmasterlist);
                                $scope.filterOptionColumn();

                            }

                        });
        };

        $scope.popoverclose = function () {

            $("[data-toggle='popover']").click();
        }


        $scope.filterOptionColumn = function () {
            //  console.log(lglsystemData.detailmode)

            $scope.Vendor = [], $scope.VName = [], $scope.Compcode = [], $scope.Office = [], $scope.Matter = [], $scope.MName = [], $scope.Status = [],
                $scope.Fyear = [], $scope.GLA = [], $scope.Amount = [], $scope.Currency = [], $scope.Mphase = [];
            $scope.filterCheckedArray = [{ fieldname: 'Vendor', checkedarray: [] }, { fieldname: 'Name1', checkedarray: [] }, { fieldname: 'Bukrs', checkedarray: [] }, { fieldname: 'Werks', checkedarray: [] }, { fieldname: 'Pspid', checkedarray: [] }, { fieldname: 'Post1', checkedarray: [] }, { fieldname: 'StatusText', checkedarray: [] }, { fieldname: 'Gjahr', checkedarray: [] }, { fieldname: 'Hkont', checkedarray: [] }, { fieldname: 'Amount', checkedarray: [] }, { fieldname: 'Currency', checkedarray: [] }, { fieldname: 'Matter Phase', checkedarray: [] }];
            $scope.dataforFiltering = angular.copy($scope.budjetmasterlistcopy);
            $scope.dataforFilteringcopy = angular.copy($scope.budjetmasterlistcopy);
            //console.log(JSON.stringify($scope.dataforFiltering))
            _.forOwn($scope.dataforFiltering, function (obj) {
                //if (obj.Kunnr != null && obj.Kunnr != '') {

                if (obj.Vendor != null && obj.Vendor != '') {
                    $scope.Vendor.push({ FilterValue: obj.Vendor, filterId: 'Vendor' })
                }
                if (obj.Name1 != null && obj.Name1 != '') {
                    $scope.VName.push({ FilterValue: obj.Name1, filterId: 'Name1' })
                }
                if (obj.Bukrs != null && obj.Bukrs != '') {
                    $scope.Compcode.push({ FilterValue: obj.Bukrs, filterId: 'Bukrs' })
                }
                if (obj.Werks != null && obj.Werks != '') {
                    $scope.Office.push({ FilterValue: obj.Werks, filterId: 'Werks' })
                }
                if (obj.Pspid != null && obj.Pspid != '') {
                    $scope.Matter.push({ FilterValue: obj.Pspid, filterId: 'Pspid' })
                }
                if (obj.Post1 != null && obj.Post1 != '') {
                    $scope.MName.push({ FilterValue: obj.Post1, filterId: 'Post1' })
                }
                if (obj.StatusText != null && obj.StatusText != '') {
                    $scope.Status.push({ FilterValue: obj.StatusText, filterId: 'StatusText' })
                }
                if (obj.Gjahr != null && obj.Gjahr != '') {
                    $scope.Fyear.push({ FilterValue: obj.Gjahr, filterId: 'Gjahr' })
                }
                if (obj.Hkont != null && obj.Hkont != '') {
                    $scope.GLA.push({ FilterValue: obj.Hkont, filterId: 'Hkont' })
                }
                if (obj.Amount != null && obj.Amount != '') {
                    $scope.Amount.push({ FilterValue: obj.Amount, filterId: 'Amount' })
                }
                if (obj.Currency != null && obj.Currency != '') {
                    $scope.Currency.push({ FilterValue: obj.Currency, filterId: 'Currency' })
                }
                if (obj.Posid != null && obj.Posid != '') {
                    $scope.Mphase.push({ FilterValue: obj.Posid, filterId: 'Posid' })
                }
            })
            $scope.gridFiltercolumDef = angular.copy($scope.gridData.columnDefs);
            var gridFiltercolumDefShowHide = angular.copy($scope.gridData.columnDefs);
            _.forOwn(gridFiltercolumDefShowHide, function (obj) {
                switch (obj.field) {
                    case 'Vendor': if ($scope.Vendor.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Name1': if ($scope.VName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Bukrs': if ($scope.Compcode.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Werks': if ($scope.Office.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Pspid': if ($scope.Matter.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Post1': if ($scope.MName.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'StatusText': if ($scope.Status.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Gjahr': if ($scope.Fyear.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Hkont': if ($scope.GLA.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Amount': if ($scope.Amount.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Currency': if ($scope.Currency.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                    case 'Posid': if ($scope.Mphase.length) obj.HaveData = true; obj.FiltercolumnDef = []; obj.showhide = false; break;
                }
            })
            $scope.gridData.columnDefs = gridFiltercolumDefShowHide;

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

                            case 'Vendor': obj.FiltercolumnDef = $scope.Vendor; break;
                            case 'Name1': obj.FiltercolumnDef = $scope.VName; break;
                            case 'Bukrs': obj.FiltercolumnDef = $scope.Compcode; break;
                            case 'Werks': obj.FiltercolumnDef = $scope.Office; break;
                            case 'Pspid': obj.FiltercolumnDef = $scope.Matter; break;
                            case 'Post1': obj.FiltercolumnDef = $scope.MName; break;
                            case 'ZzmatterName': obj.FiltercolumnDef = $scope.MName; break;
                            case 'StatusText': obj.FiltercolumnDef = $scope.Status; break;
                            case 'Gjahr': obj.FiltercolumnDef = $scope.Fyear; break;
                            case 'Hkont': obj.FiltercolumnDef = $scope.GLA; break;
                            case 'Amount': obj.FiltercolumnDef = $scope.Amount; break;
                            case 'Currency': obj.FiltercolumnDef = $scope.Currency; break;
                            case 'Posid': obj.FiltercolumnDef = $scope.Mphase; break;

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

                            if (e == ele.Vendor || e == ele.Name1 || e == ele.Bukrs || e == ele.Werks || e == ele.Pspid || e == ele.Post1 || e == ele.StatusText || e == ele.Gjahr || e == ele.Amount || e == ele.Currency || e == ele.Posid) {
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
                            if (e == ele.Vendor || e == ele.Name1 || e == ele.Bukrs || e == ele.Werks || e == ele.Pspid || e == ele.Post1 || e == ele.StatusText || e == ele.Gjahr || e == ele.Amount || e == ele.Currency || e == ele.Posid) {
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

                $scope.budjetmasterlistcopy = uniqJSON;
            }
            else {
                $scope.budjetmasterlistcopy = angular.copy($scope.dataforFilteringcopy);
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
        $scope.showFormModal = showFormModal;
        function showFormModal(type) {
            lglsystemData.lsmbudetcolumns = $scope.gridData.columnDefs;
            lglsystemData.settingvariable = 'budetsettings'
            if (type === 'settings') {
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

        }


        $scope.save = save;
        function save(type) {


            // var data = $scope.budjetmasterlistcopy;
            var transferitems = _.filter($scope.budjetmasterlistcopy, function (o) { return o.isSelect });

            var transferitemsapproved = _.filter($scope.budjetmasterlistcopy, function (o) { return o.isSelect && o.StatusText == 'Approved' });
            if (transferitemsapproved.length > 0) {
                var confirm = $mdDialog.confirm()
          .title('Please Confirm?')
          .textContent('Are you sure you want to change the approved budget amount?')
          .ariaLabel('Lucky day')
          .targetEvent(event)
          .ok('Ok')
          .cancel('Cancel');
                $mdDialog.show(confirm).then(function () {
                    invoiceService.budjetactions(transferitems, type)
                         .then(function (op_data) {
                             if (op_data) {
                                 var results = op_data.d.results;
                                 for (var i = 0; i < transferitems.length; i++) {

                                     var item = _.filter($scope.budjetmasterlistcopy, function (o) { return o == transferitems[i] });

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
                                     var item = _.filter($scope.budjetmasterlistcopy, function (o) { return o == transferitems[i] });
                                     item[0].info = op_data.error.message.value;
                                     item[0].imagedisplay = './assets/images/img_alert_split-screen.png';
                                 }
                             }
                         });
                }, function () {
                    return;
                });
            }
            else {
                invoiceService.budjetactions(transferitems, type)
                            .then(function (op_data) {
                                if (op_data) {
                                    var results = op_data.d.results;
                                    for (var i = 0; i < transferitems.length; i++) {

                                        var item = _.filter($scope.budjetmasterlistcopy, function (o) { return o == transferitems[i] });

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
                                        var item = _.filter($scope.budjetmasterlistcopy, function (o) { return o == transferitems[i] });
                                        item[0].info = op_data.error.message.value;
                                        item[0].imagedisplay = './assets/images/img_alert_split-screen.png';
                                    }
                                }
                            });
            }
        };

        function init() {
            $scope.getallbudjets();
        }

        init();




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
                        formatjsontoupload(sheetdata.BudgetTable)
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
                //  obj.Kschl = item.Type;
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
            var isvalid = true;
            for (var i = 0; i < $scope.exceldata.length; i++) {

                if ($scope.exceldata[i].hasOwnProperty('RecordType') && $scope.exceldata[i].RecordType != 'B') {
                    $mdDialog.show(
                   $mdDialog.alert()
                   .title('Excel Error')
                   .textContent('The file is inconsistent')
                   .ariaLabel('The file is inconsistent')
                   .ok('Ok')

                   );
                    isvalid = false;
                    break;
                    return;
                }

            }

            if (isvalid) {
                $scope.exceldatagrid = angular.copy($scope.exceldata);
                $scope.budjetmasterlist = angular.copy($scope.exceldatagrid);
                $scope.budjetmasterlistcopy = angular.copy($scope.budjetmasterlist);
                //    $scope.gridData.data = angular.copy($scope.exceldatagrid);
                // $scope.jsontopost = jsontopost;
                $scope.$apply();
            }

        }
        $scope.matterdetailsearchinput = '';
        $scope.filterdata = function () {
            var filterdata = angular.copy($scope.budjetmasterlistcopy);
            if ($scope.matterdetailsearchinput != '') {


                var filterdatasearch = $filter('filter')(filterdata, $scope.matterdetailsearchinput, undefined);
                $scope.budjetmasterlistcopy = filterdatasearch;
            }
            else {
                $scope.budjetmasterlistcopy = angular.copy($scope.budjetmasterlist);

            }
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





        function datenum(v, date1904) {
            if (date1904) v += 1462;
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        }

        function sheet_from_array_of_arrays(data, opts) {
            var ws = {};
            var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
            for (var R = 0; R != data.length; ++R) {
                for (var C = 0; C != data[R].length; ++C) {
                    if (range.s.r > R) range.s.r = R;
                    if (range.s.c > C) range.s.c = C;
                    if (range.e.r < R) range.e.r = R;
                    if (range.e.c < C) range.e.c = C;
                    var cell = { v: data[R][C] };
                    if (cell.v == null) continue;
                    var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                    if (typeof cell.v === 'number') cell.t = 'n';
                    else if (typeof cell.v === 'boolean') cell.t = 'b';
                    else if (cell.v instanceof Date) {
                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    }
                    else cell.t = 's';

                    ws[cell_ref] = cell;
                }
            }
            if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        }


        function Workbook() {
            if (!(this instanceof Workbook)) return new Workbook();
            this.SheetNames = [];
            this.Sheets = {};
        }

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        function UtcToDate(item) {

            if (item != null) {
                var now = new Date(parseInt(item.substr(6)));
                var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                return now_utc;


            }
            else {
                return "";
            }
        }


        $scope.downloadfile = function () {
            // debugger;
            // var gridmain = angular.copy($scope.matterDetaillistCopy);
            var gridmain = angular.copy($scope.budjetmasterlist);


            // var user=gridmain[0].Uname;
            //gridmain.push(wipRepData.selectedrow);
            var data = [];
            var data2 = [];

            var columns = angular.copy($scope.gridData.columnDefs);


            columns = _.remove(columns, function (item) {
                return item.name == 'Compcode' || item.name == 'Office' || item.name == 'Matter' || item.name == 'Matter Name' || item.name == 'Vendor' || item.name == 'Status' || item.name == 'Vendor Name' || item.name == 'Fiscal Year'
                 || item.name == 'Matter Phase' || item.name == 'GL Account' || item.name == 'Amount' || item.name == 'Currency' || item.name == 'RecordType';
            });
            var keys = [];
            var arraycols = [];
            var arraycolsnames = [];
            _.each(columns, function (item) {
                arraycols.push(item.name);
                arraycolsnames.push(item.field);
            });
            //debugger;
            // if (wipRepData.wipreportview == 'detailview') {
            //        arraycols.push("Narrative");
            //         arraycolsnames.push("Narrative");
            // }
            data.push(arraycols);


            _.each(gridmain, function (item) {
                var dataarrays = [];
                _.each(arraycolsnames, function (itemcols) {

                    var value = item[itemcols];
                    if ((!_.isUndefined(value)) && value.indexOf('Date') != -1) {

                        // dataarrays.push(UtcToDate(item[itemcols]));
                        dataarrays.push($filter('dateFilter')(item[itemcols]));

                    }
                    else {
                        dataarrays.push(item[itemcols]);
                    }
                });
                data.push(dataarrays);
            });

            /* original data */
            var ws_name = 'BudgetTable';//"Header";
            var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
            /* add worksheet to workbook */
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            //wb.SheetNames.push(ws_name1);
            //wb.Sheets[ws_name1] = ws1;
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
            var date = new Date();
            $scope.ddMMyyyy = $filter('date')(new Date(), 'ddMMyyyy');
            // var filename= +$scope.ddMMyyyy +"_"+user+"_WIPReport.xlsx";
            var filename = "Budget_Table.xlsx";
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), filename);

        }

        $scope.isacceptenable = function () {

            var transferitems = _.filter($scope.budjetmasterlistcopy, function (o) { return o.isSelect });
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
    }

})();
