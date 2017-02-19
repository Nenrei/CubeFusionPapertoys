

angular.module("appAdmin",['ngRoute','autocomplete']);


angular.module("appAdmin").config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'view/admin.html',
            controller  : 'adminController'
        })
        .when('/animes', {
            templateUrl	: 'view/adminAnimes/adminAnimes.html',
            controller 	: 'adminAnimesController'
        })
        .when('/papertoys', {
            templateUrl	: 'view/adminPapertoys/adminPapertoys.html',
            controller 	: 'adminPapertoysController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angular.module("appAdmin").controller('adminController', function($scope) {
    $scope.message = 'Estás en el panel de administración';
});

angular.module("appAdmin").factory("service", function(){

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