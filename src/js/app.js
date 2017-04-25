//myApp

angular.module("myApp",['ngRoute']);


angular.module("myApp").config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/papertoys', {
            templateUrl	: 'view/papertoys.html',
            controller 	: 'animeCtrl'
        })
        .otherwise({
            redirectTo: '/papertoys'
        });

        $locationProvider.html5Mode(true);

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