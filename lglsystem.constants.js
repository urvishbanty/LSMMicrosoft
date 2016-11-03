(function () {
    'use strict';
    angular
    	.module('lglsystem')
    	.constant('jrconstants', {
    	  WS: "s27/sap/opu/odata/SAP/",
    	  //   WS: "/sap/opu/odata/SAP/",
    	  serviceUrl: 'http://localhost:7001/s27/sap/opu/odata/SAP/ZPRS_LSW_SRV/',
    	    // serviceUrl: '/sap/opu/odata/SAP/ZPRS_LSW_SRV/',
    	    wsParms: {
    	        ZPRS_WIP_EDITOR_SRV: "ZPRS_WIP_EDITOR_SRV",
    	        ZPRS_VALUE_HELP_SRV: "ZPRS_VALUE_HELP_SRV",
    	        ZPRS_MATTER_CODES_SRV: "ZPRS_MATTER_CODES_SRV",
    	        ZPRS_LSW_SRV: "ZPRS_LSW_SRV",
    	        ZPRS_LSW_VENDOR_SRV: "ZPRS_LSW_VENDOR_SRV",
    	        ZPRS_CREC_UPLOAD_SRV: "ZPRS_CREC_UPLOAD_SRV",
    	        ZPRS_CREC_UPLOAD_MS_SRV: "ZPRS_CREC_UPLOAD_MS_SRV",
    	        ZPRS_LSW_VMATTERS_BUDGET_SRV: "ZPRS_LSW_VMATTERS_BUDGET_SRV",
    	        ZPRS_FILE_ATTACHMENT_SRV: "ZPRS_FILE_ATTACHMENT_SRV",
    	        ZPRS_FILE_ATTCH_SRV: "ZPRS_FILE_ATTACHMENT_SRV",
    	        ZPRS_MATTER_SUMMARY_REPT_SRV:"ZPRS_MATTER_SUMMARY_REPT_SRV",
    	        ZPRS_LSW_CMATTER_SEARCHHELP_SRV:"ZPRS_LSW_CMATTER_SEARCHHELP_SRV",
    	        ZPRS_LSW_CMATTERS_SRV:"ZPRS_LSW_CMATTERS_SRV"
    	    },
    	    services: {
    	        InvHeaderSet: "/InvHeaderSet",
    	        InvHeaderToDetail: "/InvHeaderToDetail",
    	        InvHeaderToStatus: "/InvHeaderToStatus",
    	        RejectInvoice: "/RejectInvoice?",
    	        ApproveInvoice: "/ApproveInvoice?",
    	        ClientDetailSet: "/ClientDetailSet",
    	        VendorDataSet: "/VendorDataSet",
    	        CrecupdSet: "/CrecupdSet?",
    	        BudgetDetailSet: "/BudgetDetailSet",
    	        BudgetUpload: "/BudgetUpload",
    	        BudgetChange: "/BudgetChange",
    	        AcceptPending:"/AcceptPending?",
    	        FileListSet: "/FileListSet",
    	        MatterReptSet:"/MatterReptSet",
    	        ZprsShWerksSet:"/ZprsShWerksSet",
    	        HeaderSet:"/HeaderSet",
    	        CounVendorSet:"/CounVendorSet",
    	        AddMaintInvoice:"/AddMaintInvoice",
    	    },
    	    action: {
    	        CONSOLIDATE: "'CONSOLIDATE'",
    	        SPLIT: "'SPLIT'",
    	        TRANSFER: "'TRANSFER'",
    	        EDIT: "'EDIT'",
    	    },
    	    qParms: {
    	        SESSION_ID: "?session_id=",
    	        FILTER: "?$filter=",
    	        JSON: "&$format=json",
    	        DATAJSON: "?$format=json",
    	        METADATA: "/$metadata",
    	        ACTION: "?Action=",
    	        value: "/$value"

    	    },
    	    lsValues: {
    	        SESSION_ID: localStorage.getItem("sid"),
    	        USER_ID: localStorage.getItem("uid"),
    	        CONUMBER: "&CoNumber=",
    	        Buzei: "&Buzei=",
    	        Hours: "&Hours=",
    	        Percentage: "&Percentage=",
    	        ToActivityCode: "&ToActivityCode=",
    	        ToFfActivityCode: "&ToFfActivityCode=",
    	        ToFfTaskCode: "&ToFfTaskCode=",
    	        ToMatter: "&ToMatter=",
    	        ToTaskCode: "&ToTaskCode=",
    	        Zzfiletype: "Zzfiletype=",
    	        Zzfilename:"Zzfilename=",
    	        Zzseqnr: "Zzseqnr=",
    	        ZzinvoiceNumber: "ZzinvoiceNumber=",
    	        ZzComments: "ZzComments=",
    	        ZzclientId: "ZzclientId=",
    	        RecordType:"&RecordType=",
    	        Bukrs: "Bukrs=",
    	        Werks: "&Werks=",
    	        Pspid: "&Pspid=",
    	        Vendor: "&Vendor=",
    	        Status: "&Status=",
    	        Name1: "&Name1=",
    	        Gjahr: "&Gjahr=",
    	        Posid: "&Posid=",
    	        Hkont: "&Hkont=",
    	        Amount: "&Amount=",
    	        Currency: "&Currency="

    	    }
    	})

})();