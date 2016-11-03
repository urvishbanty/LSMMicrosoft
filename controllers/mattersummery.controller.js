(function () {
    'use strict';

    angular
        .module('lglsystem')
        .controller('mattersummeryController', mattersummeryController);

    mattersummeryController.$inject = ['$scope', '$filter', '$modal', 'lglsystemData', 'invoiceService', 'jrconstants', 'uiGridConstants'];

    function mattersummeryController($scope, $filter, $modal, lglsystemData, invoiceService, jrconstants, uiGridConstants) {
        $scope.Items = [];
        $scope.checkboxmodel = {};
        $scope.checkboxmodel.General = true;
        $scope.checkboxmodel.Lawsuit = true;
        $scope.checkboxmodel.DemandOffers = true;
        $scope.checkboxmodel.FinalResolution = true;
        $scope.checkboxmodel.Narrative = true;
        $scope.budjetmasterlistcopy = [];
        $scope.Item = {}
        
$scope.gridData = {
    enableSorting: true,
    enableColumnResizing: true,
    enableGridMenu: false,
    data: 'budjetmasterlistcopy',
    columnDefs: [
{ name: 'Matter Number', field: 'Pspid', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Matter Description', field: 'Post1', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Status', field: 'Status', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'CMI Record Number', field: 'CmiRec', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Store Number', field: 'StoreNo', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },

{ name: 'Case Type', field: 'CaseType', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Secondary Case Type', field: 'CaseTypeSec', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Matter Type', field: 'MatterType', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Matter Sub Type', field: 'MatterSubtype', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Practice Area', field: 'PracticeArea', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Matter Currency', field: 'MatterCuky', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Open Date', field: 'OpenDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.OpenDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 100 },
{ name: 'Close Date', field: 'CloseDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.CloseDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 100 },

{ name: 'Court Name', field: 'Court', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Facility Number', field: 'Facility', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Primary Issues', field: 'PrimaryIssues', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Secondary Issues', field: 'SecondaryIssues', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'State', field: 'State', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true,  width: 100 },
{ name: 'Country', field: 'County', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Trial Date', field: 'TrialDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.TrialDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 100 },
{ name: 'Settlement Date', field: 'SettlementDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.SettlementDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 100 },
{ name: 'Conference Date', field: 'ConferenceDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ConferenceDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 100 },
{ name: 'Mediation Date', field: 'MediationDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.MediationDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 100 },

{ name: 'Current Offer', field: 'CurrentOffer', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Authorzation Amount', field: 'AuthorizationAmount', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Demand Amount', field: 'DemandAmount', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },

{ name: 'Outcome', field: 'Outcome', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true,  width: 100 },
{ name: 'Outcome Sub-Type', field: 'OutcomeSub', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Resolution Date', field: 'ResolutionDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ResolutionDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', },
{ name: 'Total Resolution Amount', field: 'TotResAmt', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Final Resolution Amount', field: 'FinResAmt', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Payer', field: 'Payer', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Payment Amount', field: 'PaymentAmount', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 },
{ name: 'Payment Date', field: 'PaymentDate', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true,cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.PaymentDate| dateFilter | date:\'MM/dd/yyyy\'}}</div>', width: 100 },

{ name: 'Narrative', field: 'Narrative_line', headerCellClass: 'gridHead gridCell', cellClass: 'gridCell', disableHiding: true, width: 100 }


            ],
            plugins: [new ngGridFlexibleHeightPlugin()],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

      $scope.Item.StoreNo = ''; 
        $scope.Item.Pspid = '';
        $scope.Item.parnrz3 = '';
        $scope.getInvoiceDetails = function () {
            var itemsFilter = [];
            var filteredQueryArray = [];
            var filteredQueryExcludeArray = [];




            if ($scope.Item.StoreNo != '') {
                itemsFilter.push(
                             {
                                 field: 'StoreNo',
                                 search: $scope.Item.StoreNo,
                                 search1: '',
                                 type: 'equal',
                                 filtertype: 'include',
                                 isand: true
                             }

                             );




            }

            if ($scope.Item.Pspid != '') {




                itemsFilter.push(
                             {
                                 field: 'Pspid',
                                 search: $scope.Item.Pspid,
                                 search1: '',
                                 type: 'equal',
                                 filtertype: 'include',
                                 isand: true
                             }

                             );



            }

            if ($scope.Item.parnrz3 != '') {



                itemsFilter.push(
                             {
                                 field: 'ParnrZ3',
                                 search: $scope.Item.parnrz3,
                                 search1: '',
                                 type: 'equal',
                                 filtertype: 'include',
                                 isand: true
                             }

                             );



            }


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

            //var filteredQueryArrayDates = [];
            //var datefield = 'Erdat';
            //var fromdate = $filter('date')(new Date(lglsystemData.wrkdate), 'yyyy-MM-ddT00:00:00');
            //var todate = $filter('date')(new Date(lglsystemData.wrkdateto), 'yyyy-MM-ddT00:00:00');
            //filteredQueryArrayDates = "((" + datefield + " ge datetime" + "'" + fromdate + "') and (" + datefield + " le datetime" + "'" + todate + "'))";


            invoiceService.getmattersummaryreport(filteredQueryArray, '')
                        .then(function (op_data) {
                            if (op_data) {
                                //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                $scope.budjetmasterlist = op_data.d.results;
                                $scope.budjetmasterlistcopy = angular.copy($scope.budjetmasterlist);


                            }

                        });







        }

        $scope.enabledisable = function (type) {


            $scope.gridData.columnDefs[5].visible = $scope.checkboxmodel.General;
            $scope.gridData.columnDefs[6].visible = $scope.checkboxmodel.General;
            $scope.gridData.columnDefs[7].visible = $scope.checkboxmodel.General;

            $scope.gridData.columnDefs[8].visible = $scope.checkboxmodel.General;
            $scope.gridData.columnDefs[9].visible = $scope.checkboxmodel.General;
            $scope.gridData.columnDefs[10].visible = $scope.checkboxmodel.General
            $scope.gridData.columnDefs[11].visible = $scope.checkboxmodel.General;
            $scope.gridData.columnDefs[12].visible = $scope.checkboxmodel.General;

            $scope.gridData.columnDefs[13].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[14].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[15].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[16].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[17].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[18].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[19].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[20].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[21].visible = $scope.checkboxmodel.Lawsuit;
            $scope.gridData.columnDefs[22].visible = $scope.checkboxmodel.Lawsuit;

            $scope.gridData.columnDefs[23].visible = $scope.checkboxmodel.DemandOffers;
            $scope.gridData.columnDefs[24].visible = $scope.checkboxmodel.DemandOffers;
            $scope.gridData.columnDefs[25].visible = $scope.checkboxmodel.DemandOffers;

            $scope.gridData.columnDefs[26].visible = $scope.checkboxmodel.FinalResolution
            $scope.gridData.columnDefs[27].visible = $scope.checkboxmodel.FinalResolution;
            $scope.gridData.columnDefs[28].visible = $scope.checkboxmodel.FinalResolution;
            $scope.gridData.columnDefs[29].visible = $scope.checkboxmodel.FinalResolution;
            $scope.gridData.columnDefs[30].visible = $scope.checkboxmodel.FinalResolution;
            $scope.gridData.columnDefs[31].visible = $scope.checkboxmodel.FinalResolution;
            $scope.gridData.columnDefs[32].visible = $scope.checkboxmodel.FinalResolution;
            $scope.gridData.columnDefs[33].visible = $scope.checkboxmodel.FinalResolution;

            $scope.gridData.columnDefs[34].visible = $scope.checkboxmodel.Narrative;


            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }

        $scope.showFormModalMatterGroup = showFormModalMatterGroup;
        function showFormModalMatterGroup(filtertype) {
            lglsystemData.filtertype = filtertype;
            var modalInstance = $modal.open({
                animation: true,
                backdrop: 'static',
                keyboard: false,
                templateUrl: "views/partials/mattergroupselect.html",
                size: 'sm',
                bindToController: true,
                controller: "mattergroupselectController"
            });

            modalInstance.result.then(function (data) {
                if (lglsystemData.filtertype === 'store') {
                    $scope.Item.StoreNo = data;
                }
                if (lglsystemData.filtertype === 'matter') {
                    $scope.Item.Pspid = data;
                }
                if (lglsystemData.filtertype === 'vendor') {
                    $scope.Item.parnrz3 = data;
                }
            });

        };


    }



})();
