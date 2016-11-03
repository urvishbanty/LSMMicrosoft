(function () {
    'use strict';

    angular
    	.module('lglsystem')
    	.factory('lglsystemData', lglsystemData);

    function lglsystemData() {
        var selectedrow;
        var invoicenumberfilter = [];
        var matterfilter = [];
        var vendornumberfilter = [];
        var wrkdate;
        var detailmode = false;
        var lsmdetailscolumns;
        var lsmdetailsdatacolumns;
        var lsmtimekeepercolumns;
        var lsmbudetcolumns;
        var wrkdateto;
        var settingvariable;
        var selectedrows = [];
        var selectedinvoiceNumber = '';
        var comments = '';
        var gridtype='';
        var paymentmode='';
        var paymode='';
        var data = {
            selectedrow: selectedrow,
            invoicenumberfilter: invoicenumberfilter,
            matterfilter: matterfilter,
            vendornumberfilter: vendornumberfilter,
            wrkdate: wrkdate,
            wrkdateto: wrkdateto,
            selectedrows: selectedrows,
            selectedinvoiceNumber: selectedinvoiceNumber,
            comments: comments,
            lsmdetailscolumns: lsmdetailscolumns,
            detailmode: detailmode,
            lsmdetailsdatacolumns: lsmdetailsdatacolumns,
            lsmtimekeepercolumns: lsmtimekeepercolumns,
            lsmbudetcolumns: lsmbudetcolumns,
            settingvariable: settingvariable,
            gridtype : gridtype,
            paymentmode:paymentmode,
            paymode:paymode
        };
        return data;
    }
})();