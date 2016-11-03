(function () {
    'use strict';

    angular
    	.module('lglsystem')
         .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope','$location', '$filter', 'invoiceService', '$timeout', 'lglsystemData', 'jrconstants'];

    function dashboardController($scope, $location, $filter, invoiceService, $timeout, lglsystemData, jrconstants) {

      $scope.labels = 
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        $scope.data = [];
        $scope.dataItems = [0,0,0,0,0,0,0,0,0,0,0,0];

          invoiceService.getInvoices()
                        .then(function (op_data) {
                            if (op_data) {
                                //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                $scope.invoicesmasterlist = op_data.d.results;
                                //var bill_amount = 0;
                                angular.forEach($scope.invoicesmasterlist, function(value, key){
                                
                                  if(value.ZzpayStatus === "01"){                 
                                   var stringDate =  value.ZzinvoiceDate+"",re = /\((.*)\)/i;
                                   var dateNumber = (stringDate.match(re)[1]);
                                   var index = $filter('date')(new Date(parseInt(dateNumber)), 'M');
                                    $scope.dataItems[index-1] +=  parseInt(value.ZzinvoiceTotal);
                                   }
                                  });
                                    $scope.data = [$scope.dataItems];
                                    console.log($scope.data);
                                  }
                              });

          //console.log($scope.$parent.invoicesmasterlistcopy);

        $scope.labelData = [];
        $scope.labeValueData = [];
         $scope.labeValueData1 = [];
        invoiceService.getInvoices()
                        .then(function (op_data) {
                            if (op_data) {

                                //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                $scope.invoicesmasterlist = op_data.d.results;
                                //console.log($scope.invoicesmasterlist);
                                angular.forEach($scope.invoicesmasterlist, function(value, key){
                                  if(value.ZzpayStatus === "01"){
                                   var index = $scope.labelData.indexOf(value.ZzmatterName);
                                    if(index === -1)
                                    {
                                    //  console.log(value.ZzmatterBudget);

                                    //only for d3js start
                                    // $scope.labelDataBudjet = value.ZzmatterName;
                                    // $scope.labelValueBudjet = value.ZZREMAIN_BDGT;
                                    ///end
                                        $scope.labelData.push(value.ZzmatterName);
                                         
                                        $scope.labeValueData.push(parseFloat(value.ZZREMAIN_BDGT));
                                        $scope.labeValueData1.push(parseFloat(value.ZzmatterBudget));
                                    }
                                  }
                                });
                                $scope.lablehorizantal = $scope.labelData;
                                $scope.datahorizontal = [$scope.labeValueData,$scope.labeValueData1];
                              }
                            });
                              

        //console.log($scope.labelData);
       

        //$scope.lablehorizantal = ['Matter Name', 'Remaining Budget','','',''];
        //$scope.datahorizontal = [[45, 80]];
            invoiceService.getInvoices()
                        .then(function (op_data) {
                            if (op_data) {
                                //var index = _.findIndex($scope.matterDetaillistCopy, row);
                                $scope.invoicesmasterlist = op_data.d.results;
                                //var selected = [];                                
                                var newGraphData = {};
                                var newGraphDataLabel = {};
                                var newGraphLabelData = [];
                                angular.forEach($scope.invoicesmasterlist, function(value, key){
                                  if(value.ZzpayStatus === "01"){
                                 // selected.push(value);
                                  if(newGraphData[value.ZzlawFirmNo])
                                  {
                                    newGraphData[value.ZzlawFirmNo] = parseFloat(newGraphData[value.ZzlawFirmNo]) + parseFloat(value.ZzinvoiceTotal);  
                                  }
                                  else
                                  {
                                    newGraphData[value.ZzlawFirmNo] = parseFloat(value.ZzinvoiceTotal);
                                    newGraphDataLabel[value.ZzlawFirmNo] = value.ZzvendorName;
                                    //newGraphLabelData.push(value.ZzmatterName);
                                  }
                                }
                                 });
                                // console.log(newGraphData);
                                // console.log(newGraphDataLabel);
                                var newGraphValueData = [];
                                angular.forEach(newGraphData, function(value, key){
                                  newGraphValueData.push(value);
                                  //newGraphLabelData.push(newGraphDataLabel[key]);

                                });
                                angular.forEach(newGraphDataLabel, function(value, key){
                                  newGraphLabelData.push(value);
                                  //newGraphLabelData.push(newGraphDataLabel[key]);

                                });
                                 //$scope.labelVendor.push(data[0].ZzmatterName)
                                  //  $scope.budgetValue.push(data[0].ZzinvoiceTotal);
                                    //console.log($scope.labelVendor , $scope.budgetValue);
                                  
                                $scope.labelshor = newGraphLabelData;
                                $scope.datahor = [newGraphValueData];
                              }
                            });
        
                                // console.log(newGraphData);
                                // console.log("res",selected);  
                                //   var holder = {};
                                //   angular.forEach(selected, function(item){
                                //       if(holder.hasOwnProperty(item.ZzmatterName)) {
                                //          holder[item.ZzmatterName] += parseFloat(item.ZzinvoiceTotal);
                                //       } else {       
                                //          holder[item.ZzmatterName] = parseFloat(item.ZzinvoiceTotal);
                                //       }
                                //   });

                                  // var data = [];

                                  //   for(var prop in holder) {
                                  //       data.push({ZzmatterName: prop, ZzinvoiceTotal: holder[prop]});   
                                  //   }
                                 
                /*[
          [65, 59, 80, 81, 56, 55, 40,45,77,10,98,75]
         ]*/;
        // $scope.labelshor = [ "", "", "", "", "","D", "E", "F", "G", "H", "I", "J"];
        // $scope.datahor = [
        //   ['', '', '', '', '', 55, 40, 45, 77, 10, 98, 75]
        // ];

  // {function getMatters() {
  
  //             invoiceService.getMatters()
  //                 .then(function (op_data) {
  //                     if (op_data) {                        
  //                         $scope.matterDetaildata = op_data.d.results;
  //                         for(var post in  $scope.matterDetaildata){
  //                             $scope.matterValues = $scope.matterDetaildata[post].Post1;
  //                             if($scope.matterValues == ZzlawFirmMatterId){
  //                                       console.log($scope.matterValues);
  //                             }
  //                         }                        
  //                     }
  
  //                 });
  //         };
  //        getMatters();
  //         }
            invoiceService.getInvoices()
                        .then(function (op_data) {
                            if (op_data) {
                                $scope.invoicesmasterlist = op_data.d.results;
                                console.log($scope.invoicesmasterlist);
                            
                                var newGraphData = {};
                                var newGraphDataLabel = {};
                                var newGraphLabelData = [];
                                angular.forEach($scope.invoicesmasterlist, function(value, key){
                                if(value.ZzpayStatus === "01"){
                                 if(newGraphData[value.MatterType])
                                  {
                                    newGraphData[value.MatterType] = parseFloat(newGraphData[value.MatterType]) + parseFloat(value.ZzinvoiceTotal);  
                                  }
                                  else
                                  {
                                    newGraphData[value.MatterType] = parseFloat(value.ZzinvoiceTotal);
                                    newGraphDataLabel[value.MatterType] = value.MatterTypeDesc;
                                    //newGraphLabelData.push(value.ZzmatterName);
                                  }
                                }
                                 });
                                //console.log(newGraphData);
                                //console.log(newGraphDataLabel);
                                var newGraphValueData = [];

                                angular.forEach(newGraphData, function(value, key){
                                  //console.log(value);
                                  newGraphValueData.push(value);
                                  //newGraphLabelData.push(newGraphDataLabel[key]);

                                });
                                angular.forEach(newGraphDataLabel, function(value, key){
                                  //console.log(value);
                                  newGraphLabelData.push(value);
                                  //newGraphLabelData.push(newGraphDataLabel[key]);

                                });
                                $scope.chartColors = ['#2ed700' , '#FF5252', '#a5ce00', '#FF8A80', '#0078d7'];
                                $scope.labelspie = newGraphLabelData;
                                $scope.datapie = newGraphValueData;
                                $scope.demo = [];
                                $scope.collection = [];
                               for(var object in $scope.labelspie){
     
                                $scope.demo[$scope.labelspie[object]] = $scope.datapie[object];
                                $scope.collection.push({"name":$scope.labelspie[object],"sal":$scope.datapie[object],"color":$scope.chartColors[object]});
                                console.log($scope.collection);
                              }
                            }
                             });

        // $scope.labelspie = ["Flate Fee", "Hourly Matter", "IP Matter"];
        // $scope.datapie = [300, 500, 100];
         


         function init() {
            $scope.filtergridtype = lglsystemData.gridtype;          
            $scope.paymentmode = lglsystemData.paymentmode;
            $scope.paymode = lglsystemData.paymode;
        };
        init();


        $scope.filtergrid = filtergrid;
        function filtergrid(type) {
          lglsystemData.gridtype = type;
          debugger;
          $location.path('/main');         
        };


        $scope.paymentmode = paymentmode;        
         function paymentmode(type) {
            debugger;
            lglsystemData.paymentmode = type;
            if (type == 'pay') {
                $scope.paymode = true;
                 lglsystemData.paymode = $scope.paymode;
                // lglsystemData.gridtype='paid';
                // $scope.header = 'Payment Status';
                // $scope.headerline = 'Invoice Detail';
            }
            else {

                $scope.paymode = false;
                 lglsystemData.paymode = $scope.paymode;
                // lglsystemData.gridtype='pending';
                // $scope.header = 'My Invoices';
                //  $scope.headerline = 'Invoice Detail Line item Detail';
            }
        };
          }
})();