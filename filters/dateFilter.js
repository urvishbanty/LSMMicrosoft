
        angular
       .module('lglsystem')
       .filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            var  now =new Date(parseInt(item.substr(6)));
            var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            return now_utc;
            
           
        }
        return "";
    };

  
       });


    angular.module('lglsystem')
        .filter('statusfilter', function () {
            return function (item) {
              
                switch(item)
                {
                    case '01': return 'Pending';
                    case '02': return 'Approved';
                    case '03': return 'Rejected';


            }
            };
        });


    angular.module('lglsystem')
        .filter('vendorfilter', function () {
            return function (item) {

                switch (item) {
                    case 'P': return 'Pending'; break;
                    case 'A': return 'Approved'; break;
                    default: return ''; break;


                }
            };
        });