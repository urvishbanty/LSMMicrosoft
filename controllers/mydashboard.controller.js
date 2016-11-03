(function() {
  'use strict';

  angular
    .module('lglsystem')
    .controller('dashboardController', dashboardController);

  dashboardController.$inject = ['$scope', '$location', '$filter', 'invoiceService', '$timeout', 'lglsystemData', 'jrconstants'];

  function dashboardController($scope, $location, $filter, invoiceService, $timeout, lglsystemData, jrconstants) {
    $scope.invoicesmasterlist = [];



    $scope.pendingcount = 0;
    $scope.approvedcount = 0;
    $scope.rejectedcount = 0;
    $scope.reviewcount = 0;
    $scope.holdcount = 0;

    $scope.paidcount = 0;
    $scope.processedcount = 0;
    $scope.apppaymentount = 0;
    $scope.failedcount = 0;

    $scope.spenddata = [];
    $scope.spenddataItems = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    $scope.labelData = [];
    $scope.ActualValueData = [];
    $scope.BudgetValueData = [];
    $scope.TotalPaid = [];
    $scope.labelValuePerc = [];
    $scope.ActualCompare = [];
     $scope.Tabledata   = [];
                 
                  

    var vendorGraphData = {};
    var vendorGraphDataLabel = {};
    var vendorGraphLabelData = [];

    var matterGraphData = {};
    var matterGraphDataLabel = {};
    var matterGraphLabelData = [];
    invoiceService.getInvoices()
      .then(function(op_data) {
        if (op_data) {
          $scope.invoicesmasterlist = op_data.d.results;
          $scope.invoicesmasterlistcopy = angular.copy($scope.invoicesmasterlist);


          $scope.pendingcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzinvStatus == '01';
          }).length;
          $scope.approvedcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzinvStatus == '02';
          }).length;
          $scope.rejectedcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzinvStatus == '03';
          }).length;
          $scope.reviewcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzinvStatus == '04';
          }).length;
          $scope.holdcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzinvStatus == '05';
          }).length;


          $scope.paidcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzpayStatus == '01';
          }).length;
          $scope.processedcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzpayStatus == '02';
          }).length;
          $scope.apppaymentount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzpayStatus == '03';
          }).length;
          $scope.failedcount = _.filter($scope.invoicesmasterlistcopy, function(o) {
            return o.ZzpayStatus == '04';
          }).length;

          _.each($scope.invoicesmasterlistcopy, function(value, key) {
            if (value.ZzpayStatus === "01") {
              
              // MySpends Graph
              var stringDate = value.ZzinvoiceDate + "",
                re = /\((.*)\)/i;
              var dateNumber = (stringDate.match(re)[1]);
              var index = $filter('date')(new Date(parseInt(dateNumber)), 'M');
              $scope.spenddataItems[index - 1] += parseInt(value.ZzinvoiceTotal);

              //Actual vs Budget Graph
              // debugger;
              //console.log($scope.invoicesmasterlist);
              var index = $scope.labelData.indexOf(value.ZzmatterName);
              if (index === -1) {
                $scope.labelData.push(value.ZzmatterName);
                $scope.ActualValueData.push(parseFloat(value.ZZREMAIN_BDGT));
                $scope.BudgetValueData.push(parseFloat(value.ZzmatterBudget));


                 var colour='';
                if (parseFloat(value.ZzmatterBudget)<parseFloat(value.ZZREMAIN_BDGT)) {                   
                    colour='rgba(255, 0, 0, 0.8)';
                }
                else { 
                    colour='rgba(2, 223, 84, 0.8)';
                }
                  $scope.ActualCompare.push(colour);

                  var total = (parseFloat(value.ZzmatterBudget) - parseFloat(value.ZZREMAIN_BDGT));
                  $scope.TotalPaid.push(total);
                 var perc = (parseFloat(value.ZZREMAIN_BDGT) / parseFloat(value.ZzmatterBudget)) * 100
                perc = Math.round(perc, 2);
                $scope.labelValuePerc.push(parseFloat(perc));
                    
                     var data   = {};
                     data.act   = 0;
                     data.bdj   = 0;
                      data.act = parseFloat(value.ZZREMAIN_BDGT)
                      data.bdj = parseFloat(value.ZzmatterBudget)

                      $scope.Tabledata.push(data);

                  }      
              


              //My Vendor Graph
              if (vendorGraphData[value.ZzlawFirmNo]) {
                vendorGraphData[value.ZzlawFirmNo] = parseFloat(vendorGraphData[value.ZzlawFirmNo]) + parseFloat(value.ZzinvoiceTotal);
              } else {
                vendorGraphData[value.ZzlawFirmNo] = parseFloat(value.ZzinvoiceTotal);
                vendorGraphDataLabel[value.ZzlawFirmNo] = value.ZzvendorName;
              }

              //Matter pie Graph 
              if (matterGraphData[value.MatterType]) {
                matterGraphData[value.MatterType] = parseFloat(matterGraphData[value.MatterType]) + parseFloat(value.ZzinvoiceTotal);
              } else {
                matterGraphData[value.MatterType] = parseFloat(value.ZzinvoiceTotal);
                matterGraphDataLabel[value.MatterType] = value.MatterTypeDesc;
              }

            }
          });

       // MySpends Graph
          $scope.spenddata = [$scope.spenddataItems];

          $scope.spendlabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
          $scope.spendcolors = [{
            backgroundColor: 'rgba(2, 223, 84, 0.8)' // 'rgba(253, 31, 94, 0.8)'//'rgba(255, 99, 132, 0.2)'
          }];


          $scope.spendoptions = {
            scales: {
              xAxes: [{
                stacked: true,
                gridLines: {
                  display: false,
                }
              }],
              yAxes: [{
                stacked: true,
                gridLines: {
                  zeroLineWidth: 3,
                  zeroLineColor: 'rgba(0, 0, 0, 0.8)',
                  display: true,
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }]
            },
            tooltips: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                      var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                      return ': $ ' + datasetLabel;
                    }
                  }
                }
           }


          //Actual vs Budget Graph
          // $scope.ActualValueData = [23452,30430,27432,21456,45673];
          // $scope.BudgetValueData = [40000,20000,30000,15000,50000];
          // console.log($scope.ActualValueData);
          // console.log($scope.BudgetValueData);
         
          $scope.Actuallabel = $scope.labelData;
          $scope.Actualdata = [$scope.TotalPaid, $scope.BudgetValueData];
          $scope.Actualperc = $scope.labelValuePerc;
          $scope.ActualTabledata = $scope.Tabledata;
          
            $scope.Actualcol = $scope.ActualCompare;
           // $scope.Actualcol =['rgba(2, 223, 84, 0.8)','rgba(255, 0, 0, 0.8)','rgba(2, 223, 84, 0.8)','rgba(255, 0, 0, 0.8)','rgba(2, 223, 84, 0.8)'];

          var budjetdata = $scope.BudgetValueData;
           $scope.Actualcolors = [{
            // backgroundColor: ['rgba(253, 31, 94, 0.8)', 'rgba(253, 31, 94, 0.8)']
          }];
          $scope.Actualseries= ['Actual Cost','Matter Budget']
         
          var staticColor ='rgba(253, 31, 94, 0.8)';

            function randomScalingFactor () {
            return $scope.Actualcol;

            }
             function Budjetdata () {
            return $scope.BudgetValueData;
           
            }

            $scope.datasetOverride1 = [
            {              
              borderWidth: 1,
              backgroundColor: randomScalingFactor()              
            },
            {
                borderWidth: 1, 
                backgroundColor: 'rgba(0,192,226,0.8)',
                borderColor:'rgba(0,192,226,0.8)',  
                data: []
            }];      
         
          $scope.Actualoptions = { 
            showAllTooltips: true, 
            scales: {
                xAxes: [{
                gridLines: {
                  zeroLineWidth: 3,
                  zeroLineColor: 'rgba(0, 0, 0, 0.8)',
                  display: true,
                  color: 'rgba(255, 255, 255, 0.1)',
                 }
                //  ,
                // ticks: {
                //     min: 0
                // }
              }],
              yAxes: [{
                gridLines: {                  
                  display: false,
                 
                }
              }]
            },
            legend: {
              display: true              
            },
             tooltips:{
                  enabled:true,
                  xPadding:10,
                  yPadding:10,
                  callbacks:{
                    //remove title
                    title:function(data){ 
                      return [];
                    },
                    //remove label
                    label:function(tooltipItem,data){ 
                      return ""; 
                    },
                    //change tooltip body
                    afterBody: function(data) {
                        // console.log('budgetdata', budgetdata);
                       
                        // console.log('data', data);
                     //   var paid = (parseFloat(data[1].xLabel) - parseFloat(data[0].xLabel));
                      var perc = (parseFloat(data[0].xLabel) / parseFloat(data[1].xLabel)) * 100
                       perc = Math.round(perc, 2);
                      return [ data[0].yLabel, +perc+' % ','Actual Cost: ' +data[0].xLabel,'Matter Budget: ' +data[1].xLabel];
                    }
                  }
            }
           
          }



          //My Vendor Graph
          var vendorGraphValueData = [];
          angular.forEach(vendorGraphData, function(value, key) {
            vendorGraphValueData.push(value);
          });
          angular.forEach(vendorGraphDataLabel, function(value, key) {            
               var lblArray = value.split('-');
              vendorGraphLabelData.push(lblArray[0]);
        
          });



          $scope.vendorlabel =  vendorGraphLabelData;
          $scope.vendordata = [vendorGraphValueData];


           $scope.vendorcolors = [{
            // backgroundColor: 'rgba(2, 223, 84, 0.8)' // 'rgba(253, 31, 94, 0.8)'//'rgba(255, 99, 132, 0.2)'
           backgroundColor: 'rgba(0,192,226,0.8)'
           
          }];

          $scope.vendoroptions = {
            scales: {
              xAxes: [{
                stacked: true,
                gridLines: {
                  display: false,
                }
              }],
              yAxes: [{
                stacked: true,
                gridLines: {
                  zeroLineWidth: 3,
                  zeroLineColor: 'rgba(0, 0, 0, 0.8)',
                  display: true,
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }]
            },
            tooltips: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                      var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                      return ': $ ' + datasetLabel;
                    }
                  }
                }
            }




          //Matter pie Graph 
          var matterGraphValueData = [];
          angular.forEach(matterGraphData, function(value, key) {
            matterGraphValueData.push(value);
          });
          angular.forEach(matterGraphDataLabel, function(value, key) {
            matterGraphLabelData.push(value);
          });
          $scope.Matterlabels = matterGraphLabelData;

          $scope.Matterdata = matterGraphValueData;



             $scope.Matteroptions = { 
                  // showAllTooltips: true
                legend: {
                  display: true                  
                },
                tooltips: {

                  callbacks: {
                    label: function(tooltipItem, data) {
                      // console.log('data', data);
                      // debugger;
                      var label = data.labels[tooltipItem.index];
                      var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                      return label + ': $ ' + datasetLabel;
                    }
                  }
                }
            }



        }
      });



    function init() {
      $scope.filtergridtype = lglsystemData.gridtype;
      $scope.paymentmode = lglsystemData.paymentmode;
      $scope.paymode = lglsystemData.paymode;
    };
    init();


    $scope.filtergrid = filtergrid;

    function filtergrid(type) {
      lglsystemData.gridtype = type;
      // debugger;
      $location.path('/main');
    };


    $scope.paymentmode = paymentmode;

    function paymentmode(type) {
      // debugger;
      lglsystemData.paymentmode = type;
      if (type == 'pay') {
        $scope.paymode = true;
        lglsystemData.paymode = $scope.paymode;
        // lglsystemData.gridtype='paid';
        // $scope.header = 'Payment Status';
        // $scope.headerline = 'Invoice Detail';
      } else {

        $scope.paymode = false;
        lglsystemData.paymode = $scope.paymode;
        // lglsystemData.gridtype='pending';
        // $scope.header = 'My Invoices';
        //  $scope.headerline = 'Invoice Detail Line item Detail';
      }
    };
  }
})();