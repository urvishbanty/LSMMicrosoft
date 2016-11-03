angular.module('lglsystem').directive('ngHeader', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/partials/header.html',
    controller: function($scope,$rootScope,$location) {
    $rootScope.slideNav=true;
    $rootScope.cls="skin-blue sidebar-mini fixed";
    $scope.activeSlide=function(){
        $rootScope.slideNav=!$rootScope.slideNav;     
        if($rootScope.slideNav==false){
          $rootScope.cls="skin-blue sidebar-mini fixed sidebar-collapse";
        }else{
           $rootScope.cls="skin-blue sidebar-mini fixed"; 
        }
    }
    $scope.activeSlideHover=function(){
        if($rootScope.slideNav==false){
          $rootScope.cls="skin-blue sidebar-mini fixed sidebar-expanded-on-hover";
        }else{
           $rootScope.cls="skin-blue sidebar-mini fixed"; 
        }
    }
    $scope.isCurrentPath = function (path) {
      return $location.path() == path;
    };

    
    }
  }
});