//myApp

angular.module("myApp",['ngRoute','autocomplete']);


angular.module("myApp").config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl	: 'view/info.html',
            controller 	: 'infoController'
        })
        .when('/papertoys', {
            templateUrl	: 'view/papertoys.html',
            controller 	: 'animeCtrl'
        })
        .when('/nosotros', {
            templateUrl : 'view/about.html',
            controller 	: 'aboutController' 
        })
        .when('/contacto', {
            templateUrl : 'view/contact.html',
            controller 	: 'contactController'
        })
        .otherwise({
            redirectTo: '/'
        });
/*
    $routeProvider
        .when('/papertoys', {
            templateUrl	: 'view/papertoys.html',
            controller 	: 'animeCtrl'
        })
        .otherwise({
            redirectTo: '/papertoys'
        });
*/
});

angular.module("myApp").controller('aboutController', function($scope) {
    $scope.message = 'Esta es la página "Acerca de"';
});

angular.module("myApp").controller('infoController', function($scope) {
    $scope.message = 'Esta es la página "Información"';
});

angular.module("myApp").controller('contactController', function($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});

angular.module("myApp").controller('mainController', function($scope) {
    $scope.message = 'Esta es la página de "Inicio"';
});


angular.module("myApp").controller("mainCtrl", function(service){
    var cab = this;

    cab.service = service;

    cab.logout = function(){
        cab.service.loggedUser = {};
        cab.service.name = "";
        cab.service.password = "";
    };

});

angular.module("myApp").factory("service", function(){

    var ret = function(){};

    ret.loggedUser = {};
    ret.name = "";
    ret.password = "";

    //ret.route = "/Proyectos/CubeFusionPapertoys/dist/images/";
    ret.route = "/images/";

    ret.routes = {
        animeImages: ret.route + "animes/",
        paperImages: ret.route + "papertoys/",
        modelImages: ret.route + "models/"
    };

    return ret;
});