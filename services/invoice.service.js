(function () {
    'use strict';

    angular
      .module('lglsystem')
      .factory('invoiceService', invoiceService);

    invoiceService.$inject = ['$http', 'jrconstants','$mdDialog','$filter','dateFilter'];

    function invoiceService($http, jrconstants, $mdDialog,$filter,dateFilter) {

        function getInvoices(FileName) {
            var url=jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.InvHeaderSet + jrconstants.qParms.DATAJSON


            if (!(_.isUndefined(FileName))) {
                url = jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.InvHeaderSet + '?filter(filename eq ' + FileName + ')' + jrconstants.qParms.DATAJSON;
            }

            return $http({
                method: "GET",
                url: url
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {
             
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };

        function getVendorData(row) {

            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_CREC_UPLOAD_MS_SRV + jrconstants.services.VendorDataSet + '(' + '%27' + row.Kunnr + '%27' + ')' + jrconstants.services.CrecupdSet + jrconstants.qParms.DATAJSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };

function getMetaData(){
  return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_CMATTERS_SRV + jrconstants.services.ZprsShCaseTypeSet + jrconstants.qParms.DATAJSON
                }).then(response.data);
}

        function getInvoicesFilter(filter, excludefilter) {

            var query = '';
            _.each(filter, function (item) {

                query = query + item.filteredQuery + item.operator + ' ';

            });


         

            var lastIndex = query.lastIndexOf("and");

            query = query.substring(0, lastIndex);



            var excludequery = excludefilter;
           

            var queryfilter = '';

            if (query !== '') {
                queryfilter = '(' + query + ')';
            }
            if (query !== '' && excludequery !== '') {
                queryfilter = queryfilter + ' and ' + excludequery;
            }
            if (query === '' && excludequery !== '') {
                queryfilter = excludequery;
            }


            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.InvHeaderSet + jrconstants.qParms.FILTER + queryfilter + jrconstants.qParms.JSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };



        function getDetailInvoices(row) {

            var url = jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.InvHeaderSet + "(" + jrconstants.lsValues.Zzfiletype + '%27' + row.Zzfiletype + '%27' + ',' + jrconstants.lsValues.ZzinvoiceNumber + '%27' + row.ZzinvoiceNumber + '%27' + ',' + jrconstants.lsValues.Zzseqnr + '%27' + row.Zzseqnr + '%27' + ')' + jrconstants.services.InvHeaderToDetail + jrconstants.qParms.DATAJSON


            //if (!(_.isUndefined(FileName))) {
            //    url = jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.InvHeaderSet + "(" + jrconstants.lsValues.Zzfiletype + '%27' + row.Zzfiletype + '%27' + ',' + jrconstants.lsValues.ZzinvoiceNumber + '%27' + row.ZzinvoiceNumber + '%27' + ',' + jrconstants.lsValues.Zzseqnr + '%27' + row.Zzseqnr + '%27' + ',' + jrconstants.lsValues.Zzfilename + '%27' + FileName + '%27' + ')' + jrconstants.services.InvHeaderToDetail + jrconstants.qParms.DATAJSON
            //}


            return $http({
                method: "GET",
                url: url//jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.InvHeaderSet + "(" + jrconstants.lsValues.Zzfiletype + '%27' + row.Zzfiletype + '%27' + ',' + jrconstants.lsValues.ZzinvoiceNumber + '%27' + row.ZzinvoiceNumber + '%27' + ',' + jrconstants.lsValues.Zzseqnr + '%27' + row.Zzseqnr + '%27' + ')' + jrconstants.services.InvHeaderToDetail + jrconstants.qParms.DATAJSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {
                console.log("response.data");
                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };


        function getDetailInvoicesstatus(row) {
            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.InvHeaderSet + "(" + jrconstants.lsValues.Zzfiletype + '%27' + row.Zzfiletype + '%27' + ',' + jrconstants.lsValues.ZzinvoiceNumber + '%27' + row.ZzinvoiceNumber + '%27' + ',' + jrconstants.lsValues.Zzseqnr + '%27' + row.Zzseqnr + '%27' + ')' + jrconstants.services.InvHeaderToStatus + jrconstants.qParms.DATAJSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };


        function rejectInvoices(matters, rowcomments) {


            var Zzfiletype = '';
            var ZzinvoiceNumber = '';
            var Zzseqnr = '';
            var comments = '';

            _.each(matters, function (item) {

                Zzfiletype = Zzfiletype + item.Zzfiletype + ',';
                ZzinvoiceNumber = ZzinvoiceNumber + item.ZzinvoiceNumber + ',';
                Zzseqnr = Zzseqnr + item.Zzseqnr + ',';
                comments = comments + rowcomments + ',';
            });

            Zzfiletype = Zzfiletype.replaceAll('undefined', '');
            var lastIndex = Zzfiletype.lastIndexOf(",");
            Zzfiletype = Zzfiletype.substring(0, lastIndex);
            if (Zzfiletype == ',') { Zzfiletype = ''; }

            ZzinvoiceNumber = ZzinvoiceNumber.replaceAll('undefined', '');
            var lastIndex = ZzinvoiceNumber.lastIndexOf(",");
            ZzinvoiceNumber = ZzinvoiceNumber.substring(0, lastIndex);
            if (ZzinvoiceNumber == ',') { ZzinvoiceNumber = ''; }

            Zzseqnr = Zzseqnr.replaceAll('undefined', '');
            var lastIndex = Zzseqnr.lastIndexOf(",");
            Zzseqnr = Zzseqnr.substring(0, lastIndex);
            if (Zzseqnr == ',') { Zzseqnr = ''; }

            comments = comments.replaceAll('undefined', '');
            var lastIndex = comments.lastIndexOf(",");
            comments = comments.substring(0, lastIndex);
            if (comments == ',') { comments = ''; }


            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.RejectInvoice + jrconstants.lsValues.ZzComments + '%27' + comments + '%27' + '&' + jrconstants.lsValues.Zzfiletype + '%27' + Zzfiletype + '%27' + '&' + jrconstants.lsValues.ZzinvoiceNumber + '%27' + ZzinvoiceNumber + '%27' + '&' + jrconstants.lsValues.Zzseqnr + '%27' + Zzseqnr + '%27' + jrconstants.qParms.JSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };

        function createInvoices(matters) {



            var Zzfiletype = '';
            var ZzinvoiceNumber = '';
            var Zzseqnr = '';
          

            _.each(matters, function (item) {

                Zzfiletype = Zzfiletype + item.Zzfiletype + ',';
                ZzinvoiceNumber = ZzinvoiceNumber + item.ZzinvoiceNumber + ',';
                Zzseqnr = Zzseqnr + item.Zzseqnr + ',';
            });

            Zzfiletype = Zzfiletype.replaceAll('undefined', '');
            var lastIndex = Zzfiletype.lastIndexOf(",");
            Zzfiletype = Zzfiletype.substring(0, lastIndex);
            if (Zzfiletype == ',') { Zzfiletype = ''; }

            ZzinvoiceNumber = ZzinvoiceNumber.replaceAll('undefined', '');
            var lastIndex = ZzinvoiceNumber.lastIndexOf(",");
            ZzinvoiceNumber = ZzinvoiceNumber.substring(0, lastIndex);
            if (ZzinvoiceNumber == ',') { ZzinvoiceNumber = ''; }

            Zzseqnr = Zzseqnr.replaceAll('undefined', '');
            var lastIndex = Zzseqnr.lastIndexOf(",");
            Zzseqnr = Zzseqnr.substring(0, lastIndex);
            if (Zzseqnr == ',') { Zzseqnr = ''; }

   


            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.ApproveInvoice + jrconstants.lsValues.Zzfiletype + '%27' + Zzfiletype + '%27' + '&' + jrconstants.lsValues.ZzinvoiceNumber + '%27' + ZzinvoiceNumber + '%27' + '&' + jrconstants.lsValues.Zzseqnr + '%27' + Zzseqnr + '%27'  + jrconstants.qParms.JSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };
       

        function acceptpending(matters, rowStatus) {
            

            var Zzfiletype = '';
            var ZzinvoiceNumber = '';
            var Zzseqnr = '';
            var Status = '';

            _.each(matters, function (item) {

                Zzfiletype = Zzfiletype + item.Zzfiletype + ',';
                ZzinvoiceNumber = ZzinvoiceNumber + item.ZzinvoiceNumber + ',';
                Zzseqnr = Zzseqnr + item.Zzseqnr + ',';
                Status = Status + rowStatus + ',';
            });

            Zzfiletype = Zzfiletype.replaceAll('undefined', '');
            var lastIndex = Zzfiletype.lastIndexOf(",");
            Zzfiletype = Zzfiletype.substring(0, lastIndex);
            if (Zzfiletype == ',') { Zzfiletype = ''; }

            ZzinvoiceNumber = ZzinvoiceNumber.replaceAll('undefined', '');
            var lastIndex = ZzinvoiceNumber.lastIndexOf(",");
            ZzinvoiceNumber = ZzinvoiceNumber.substring(0, lastIndex);
            if (ZzinvoiceNumber == ',') { ZzinvoiceNumber = ''; }

            Zzseqnr = Zzseqnr.replaceAll('undefined', '');
            var lastIndex = Zzseqnr.lastIndexOf(",");
            Zzseqnr = Zzseqnr.substring(0, lastIndex);
            if (Zzseqnr == ',') { Zzseqnr = ''; }

            Status = Status.replaceAll('undefined', '');
            var lastIndex = Status.lastIndexOf(",");
            Status = Status.substring(0, lastIndex);
            if (Status == ',') { Status = ''; }


            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.AcceptPending + jrconstants.lsValues.Zzfiletype + '%27' + Zzfiletype + '%27' + '&' + jrconstants.lsValues.ZzinvoiceNumber + '%27' + ZzinvoiceNumber + '%27' + '&' + jrconstants.lsValues.Zzseqnr + '%27' + Zzseqnr + '%27'  + jrconstants.lsValues.Status + '%27' + Status + '%27' + jrconstants.qParms.JSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };


        function getClients() {

            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_CREC_UPLOAD_MS_SRV + jrconstants.services.VendorDataSet + jrconstants.qParms.DATAJSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };

        function saveclient(ip_data, sapToken) {

            return $http({
                method: "POST",
                headers: {
                    'X-CSRF-Token': sapToken,
                    'Content-Type': 'application/json'
                },
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_CREC_UPLOAD_SRV + '/UserdataSet',
                data: ip_data
            })
            .then(saveclientrequestComplete)
      .catch(saveclientrequestFailed);

            function saveclientrequestComplete(response) {
                return response;
            }

            function saveclientrequestFailed(error) {
                return error.data;
            }
        };


        function getBudjetData(row) {

            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_VMATTERS_BUDGET_SRV + jrconstants.services.BudgetDetailSet + jrconstants.qParms.DATAJSON
            }).then(getallInvoiceServiceComplete)
              .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getallInvoiceServiceFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                console.log(error);
            }
        };

        function budjetactions(invoices,type) {
            var Bukrs = '';
            var Werks = '';
            var Pspid = '';
            var Vendor = '';
            var Status = '';
            var Name1 = '';
            var Gjahr = '';
            var Posid = '';
            var Hkont = '';
            var Amount = '';
            var Currency = '';
            var RecordType = '';
            _.each(invoices, function (item) {


                Bukrs = Bukrs + item.Bukrs + '|';
                Werks = Werks + item.Werks + '|';

                Pspid = Pspid + item.Pspid + '|';
                Vendor = Vendor + item.Vendor + '|';
               

                Status = Status + item.Status + '|';
                Name1 = Name1 + item.Name1 + '|';

                Gjahr = Gjahr + item.Gjahr + '|';
                Posid = Posid + item.Posid + '|';

                Hkont = Hkont + item.Hkont + '|';

                Amount = Amount + item.Amount + '|';
                Currency = Currency + item.Currency + '|';
                RecordType = RecordType + item.RecordType + '|';
            });

            Bukrs = Bukrs.replaceAll('undefined', '');
            var lastIndex = Bukrs.lastIndexOf("|");
            Bukrs = Bukrs.substring(0, lastIndex);
            if (Bukrs == '|') { Bukrs = ''; }

            Werks = Werks.replaceAll('undefined', '');
            lastIndex = Werks.lastIndexOf("|");
            Werks = Werks.substring(0, lastIndex);
            if (Werks == '|') { Werks = ''; }

            Pspid = Pspid.replaceAll('undefined', '');
            lastIndex = Pspid.lastIndexOf("|");
            Pspid = Pspid.substring(0, lastIndex);
            if (Pspid == '|') { Pspid = ''; }

            Vendor = Vendor.replaceAll('undefined', '');
            lastIndex = Vendor.lastIndexOf("|");
            Vendor = Vendor.substring(0, lastIndex);
            if (Vendor == '|') { Vendor = ''; }


            Status = Status.replaceAll('undefined', '');
            lastIndex = Status.lastIndexOf("|");
            Status = Status.substring(0, lastIndex);
            if (Status == '|') { Status = ''; }

            Name1 = Name1.replaceAll('undefined', '');
            lastIndex = Name1.lastIndexOf("|");
            Name1 = Name1.substring(0, lastIndex);
            if (Name1 == '|') { Name1 = ''; }

            Gjahr = Gjahr.replaceAll('undefined', '');
            lastIndex = Gjahr.lastIndexOf("|");
            Gjahr = Gjahr.substring(0, lastIndex);
            if (Gjahr == '|') { Gjahr = ''; }

            Posid = Posid.replaceAll('undefined', '');
            lastIndex = Posid.lastIndexOf("|");
            Posid = Posid.substring(0, lastIndex);
            if (Posid == '|') { Posid = ''; }

            Hkont = Hkont.replaceAll('undefined', '');
            lastIndex = Hkont.lastIndexOf("|");
            Hkont = Hkont.substring(0, lastIndex);
            if (Hkont == '|') { Hkont = ''; }

            Amount = Amount.replaceAll('undefined', '');
            lastIndex = Amount.lastIndexOf("|");
            Amount = Amount.substring(0, lastIndex);
            if (Amount == '|') { Amount = ''; }

            Currency = Currency.replaceAll('undefined', '');
            lastIndex = Currency.lastIndexOf("|");
            Currency = Currency.substring(0, lastIndex);
            if (Currency == '|') { Currency = ''; }


            RecordType = RecordType.replaceAll('undefined', '');
            lastIndex = RecordType.lastIndexOf("|");
            RecordType = RecordType.substring(0, lastIndex);
            if (RecordType == '|') { RecordType = ''; }
            
           
            var Bukrsquery = jrconstants.lsValues.Bukrs + "'" + Bukrs + "'" ;
            var Werksquery =jrconstants.lsValues.Werks + "'" + Werks + "'" ;
            var Pspidquery =jrconstants.lsValues.Pspid + "'" + Pspid + "'" ;
            var Vendorquery =jrconstants.lsValues.Vendor + "'" + Vendor + "'" ;
            var Statusquery =jrconstants.lsValues.Status + "'" + Status + "'" ;
            var Name1query = '';//jrconstants.lsValues.Name1 + "'" + Name1 + "'" ;
            var Gjahrquery =jrconstants.lsValues.Gjahr + "'" + Gjahr + "'" ;
            var Posidsquery =jrconstants.lsValues.Posid + "'" + Posid + "'" ;
            var Hkontquery =jrconstants.lsValues.Hkont + "'" + Hkont + "'" ;
            var Amountquery = jrconstants.lsValues.Amount + "'" + Amount + "'";
            var RecordTypequery = jrconstants.lsValues.RecordType + "'" + RecordType + "'";
            var Currencyquery = jrconstants.lsValues.Currency + "'" + Currency + "'" + jrconstants.qParms.JSON;
                    


            return $http({
                method: "GET",
                url: encodeURI(jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_VMATTERS_BUDGET_SRV + "/"
                    + type + "?" + Bukrsquery + Werksquery + Pspidquery + Vendorquery + Statusquery + Name1query + Gjahrquery + Posidsquery + Hkontquery + Amountquery + RecordTypequery + Currencyquery)
            }).then(budjetactionsComplete)
                 .catch(budjetactionsFailed);

            function budjetactionsComplete(response) {


                return response.data;
            }

            function budjetactionsFailed(error) {
                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );
                return error.data;
            }
        };

        String.prototype.replaceAll = function (target, replacement) {
            return this.split(target).join(replacement);
        };

        function FileUploadclient(sapToken, file) {
            debugger;
            var uploadUrl = jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + '/UploadInvoiceCollection';
            var fd = new FormData();
            fd.append('file', file);
            //fd.append('Name', file.name);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'X-CSRF-Token': sapToken, 'Content-Type': undefined, 'slug': file.name },

            })
         

            .then(saveclientrequestComplete)
      .catch(saveclientrequestFailed);

            function saveclientrequestComplete(response) {
                return response;
            }

            function saveclientrequestFailed(error) {

                $mdDialog.show(
                      $mdDialog.alert()
                      .title('ERROR')
                      .textContent('Server Error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')

                      );

                return error.data;
            }
        };


    function FileUploadAttachclient(ip_data, sapToken, file) {
    // console.log('ip_data ' , ip_data);
        debugger;

            var uploadUrl = jrconstants.WS + jrconstants.wsParms.ZPRS_FILE_ATTCH_SRV + '/FileAttachSet';
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'X-CSRF-Token': sapToken, 'Content-Type': undefined, 'slug': ip_data.Vbeln + '|' + ip_data.Name },

            })
          
            .then(saveclientrequestComplete)
            .catch(saveclientrequestFailed);

            function saveclientrequestComplete(response) {
                return response;
            }

            function saveclientrequestFailed(error) {               
                $mdDialog.show(
                        $mdDialog.alert()
                        .title('ERROR')
                        .textContent('Server Error')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')

                        );
            }
        };



      function getFileList(billno) {

                var queryfilter = '(Vbeln   eq' + "'" + billno + "')";
                return $http({
                    method: "GET",
                    url: encodeURI(jrconstants.WS + jrconstants.wsParms.ZPRS_FILE_ATTCH_SRV + jrconstants.services.FileListSet + jrconstants.qParms.FILTER + queryfilter + jrconstants.qParms.JSON)
                }).then(getFileListServiceComplete)
              .catch(getFileListServiceFailed);

                function getFileListServiceComplete(response) {

                    
                    return response.data;
                }

                function getFileListServiceFailed(error) {

                    
                    $mdDialog.show(
                            $mdDialog.alert()
                            .title('ERROR')
                            .textContent('Server Error')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')

                            );
                }
            };

        function getFileDownload(detail) {
            
            var queryfilter = "/FileDispCollection(Loio=" + "'" + detail.LoioId + "'" + ",Ext='" + detail.Docuclass + "'" + ",Fname='" + detail.Descript + "')";
            var url = encodeURI(jrconstants.WS + jrconstants.wsParms.ZPRS_FILE_ATTACHMENT_SRV + queryfilter + jrconstants.qParms.value)

            window.open(url);

        };


        function deletedocument(billno, detail) {
            var queryfilter = '/FileListSet(Vbeln=' + "'" + billno + "',Objkey=" + "'" + detail.LoioId + "')/FileDelete?";
            return $http({
                method: "GET",
                url: encodeURI(jrconstants.WS + jrconstants.wsParms.ZPRS_FILE_ATTCH_SRV  + queryfilter + jrconstants.qParms.JSON)
            }).then(getFileListServiceComplete)
          .catch(getFileListServiceFailed);

            function getFileListServiceComplete(response) {

                
                return response.data;
            }

            function getFileListServiceFailed(error) {
                
                
                $mdDialog.show(
                        $mdDialog.alert()
                        .title('ERROR')
                        .textContent('Server Error')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')

                        );
                return error.data;
            }

        };


        function getCurrencygroup() {


            return $http({
                method: "GET",
                url: encodeURI(jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_SRV + jrconstants.services.ZCurrencySet + jrconstants.qParms.DATAJSON)
            }).then(getallmattersServiceComplete)
                .catch(getallmattersServiceFailed);

            function getallmattersServiceComplete(response) {

                return response.data;
            }

            function getallmattersServiceFailed(error) {


                $mdDialog.show(
                        $mdDialog.alert()
                        .title('ERROR')
                        .textContent('Server Error')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')

                        );
            }
        };

        function getmattersummaryreport(filter, excludefilter) {

            var query = '';
            _.each(filter, function (item) {

                query = query + item.filteredQuery + item.operator + ' ';

            });




            var lastIndex = query.lastIndexOf("and");

            query = query.substring(0, lastIndex);



            var excludequery = excludefilter;


            var queryfilter = '';

            if (query !== '') {
                queryfilter = '(' + query + ')';
            }
            if (query !== '' && excludequery !== '') {
                queryfilter = queryfilter + ' and ' + excludequery;
            }
            if (query === '' && excludequery !== '') {
                queryfilter = excludequery;
            }


            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_MATTER_SUMMARY_REPT_SRV + jrconstants.services.MatterReptSet + jrconstants.qParms.FILTER + queryfilter + jrconstants.qParms.JSON
            }).then(getallInvoiceServiceComplete)
                .catch(getallInvoiceServiceFailed);

            function getallInvoiceServiceComplete(response) {

                console.log(response.data);

                return response.data;
            }

            function getallInvoiceServiceFailed(error) {

                console.log(error);
            }
        };

        function getZprsShWerksSet() {
            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_CMATTER_SEARCHHELP_SRV + jrconstants.services.ZprsShWerksSet + jrconstants.qParms.DATAJSON
            }).then(getServiceComplete)
                .catch(getServiceFailed);

            function getServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }
            function getServiceFailed(error) {

                $mdDialog.show(
                       $mdDialog.alert()
                       .title('ERROR')
                       .textContent('Server Error')
                       .ariaLabel('Alert Dialog Demo')
                       .ok('Ok')

                       );
            }
        }

        function getMatters() {
            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_LSW_CMATTERS_SRV + jrconstants.services.HeaderSet + jrconstants.qParms.DATAJSON
            }).then(getServiceComplete)
                .catch(getServiceFailed);

            function getServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }

            function getServiceFailed(error) {

                $mdDialog.show(
                       $mdDialog.alert()
                       .title('ERROR')
                       .textContent('Server Error')
                       .ariaLabel('Alert Dialog Demo')
                       .ok('Ok')

                       );
            }
        };

        function getCounVendorSet() {
            return $http({
                method: "GET",
                url: jrconstants.WS + jrconstants.wsParms.ZPRS_MATTER_SUMMARY_REPT_SRV + jrconstants.services.CounVendorSet + jrconstants.qParms.DATAJSON
            }).then(getServiceComplete)
                .catch(getServiceFailed);

            function getServiceComplete(response) {

                console.log(response.data);
                return response.data;
            }
            function getServiceFailed(error) {

                $mdDialog.show(
                       $mdDialog.alert()
                       .title('ERROR')
                       .textContent('Server Error')
                       .ariaLabel('Alert Dialog Demo')
                       .ok('Ok')

                       );
            }
        }

        var service = {
            getInvoices: getInvoices,
            getDetailInvoices: getDetailInvoices,
            rejectInvoices: rejectInvoices,
            createInvoices: createInvoices,
            getInvoicesFilter: getInvoicesFilter,
            getDetailInvoicesstatus: getDetailInvoicesstatus,
            getClients: getClients,
            getVendorData: getVendorData,
            saveclient: saveclient,
            getBudjetData: getBudjetData,
            budjetactions: budjetactions,
            acceptpending: acceptpending,
            FileUploadclient: FileUploadclient,
            getFileList:getFileList,
            getFileDownload:getFileDownload,
            deletedocument:deletedocument,
            FileUploadAttachclient:FileUploadAttachclient,
            getMatters: getMatters,
            getCounVendorSet: getCounVendorSet,
            getZprsShWerksSet: getZprsShWerksSet,
            getmattersummaryreport: getmattersummaryreport

        };
        return service;
    };
})();