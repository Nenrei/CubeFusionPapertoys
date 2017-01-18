/**
 * Created by Enman on 06/07/2016.
 */
angular.module("myApp").controller("adminPapertoysController", function ($http, service, $window) {

    var me = this;

    me.service = service;

    me.imageRoute = me.service.routes.paperImages;
	me.modelRoute = me.service.routes.modelImages;

    me.currentView = 'view/adminComponents/adminPapertoys/listPapertoys.html';
    me.currentPaper = null;
    me.mode = "READ";
    me.title = "";

    me.animeList = [];
    me.animeListComplete = [];
    me.selectedAnime = "";

    me.paperList = [{}];

    var setCurrentPaper = function(paper){
        return {
            id: paper.id,
            anime: paper.anime,
            name: paper.name,
            status: paper.status,
            style: paper.style,
            parts: paper.parts,
            image: paper.image,
            model: paper.model,
            download: paper.download,
            order: paper.order,
            animeName: paper.animeName,
			animeImage: paper.animeImage
        };
    };


    me.openReadPanel = function (papertoy) {
        me.currentPaper = setCurrentPaper(papertoy);
        me.mode = "READ";
        me.title = papertoy.name;
        me.currentView = 'view/adminComponents/adminPapertoys/crudPapertoys.html';
    };

    me.openUpdatePanel = function (papertoy) {
        me.currentPaper = setCurrentPaper(papertoy);
        me.mode = "EDIT";
        me.title = papertoy.name;
        me.currentView = 'view/adminComponents/adminPapertoys/crudPapertoys.html';
    };

    me.openCreatePanel = function () {
        me.currentPaper = {
            id: 0,
            anime: 0,
            name: null,
            status: null,
            style: null,
            parts: 1,
            image: null,
            model: null,
            download: null,
            order: 1,
            animeName: null
        };
        me.mode = "CREATE";
        me.currentView = 'view/adminComponents/adminPapertoys/crudPapertoys.html';
    };

    me.deletePapertoy = function (papertoy) {
        if ($window.confirm("Eliminar el papertoy " + papertoy.name + "?")) {
            deletePapertoyDB(papertoy.id);
        }
    };

    me.cancel = function () {
        me.currentPaper = null;
        me.currentView = 'view/adminComponents/adminPapertoys/listPapertoys.html';
    };

    me.save = function () {
        if (me.mode == "EDIT") {
            updatePapertoy(me.currentPaper);
        } else {
            createPapertoy(me.currentPaper);
        }
    };


    me.orderColumn = '';

    me.changeOrder = function (newOrder) {
        if (newOrder == me.orderColumn) {
            me.orderColumn = '-' + newOrder;
        } else {
            me.orderColumn = newOrder;
        }
    };

    me.getPapers = function (name) {
        getAllPapertoys(getSelectedAnimeId(name));
    };

    var getSelectedAnimeId = function(name){
        for (var i = 0; i < me.animeList.length; i++) {
            if (me.animeList[i] == name) {
                return Number(me.animeListComplete[i].id);
            }
        }
    };


//__________________________________________________________________________________
//________________    DATABASE                          ____________________________
//__________________________________________________________________________________

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var getAllPapertoys = function (id) {
        $http.post(
            "http://cubefusionpapertoys.com/database/papertoys/getAllPapersByAnime.php",
            {
                idAnime: id
            },
            config
        ).success(function (response) {

            for (var i = 0; i < response.papertoys.length; i++) {
                response.papertoys[i].id = Number(response.papertoys[i].id);
                response.papertoys[i].parts = Number(response.papertoys[i].parts);
                response.papertoys[i].order = Number(response.papertoys[i].paperOrder);
            }

            me.paperList = response.papertoys;

        });
    };

    var updatePapertoy = function (paper) {
        $http.post(
            "http://cubefusionpapertoys.com/database/papertoys/updatePapertoy.php",
            {
                id: paper.id,
                anime: paper.anime,
                name: paper.name,
                status: paper.status,
                style: paper.style,
                parts: paper.parts,
                image: paper.image,
                model: paper.model,
                download: paper.download,
                order: paper.order
            },
            config
        ).success(function () {
                getAllPapertoys(paper.anime);
                me.cancel();
            });
    };

    var createPapertoy = function (paper) {
        var paper = {
            anime: getSelectedAnimeId(me.selectedAnime),
            name: paper.name,
            status: paper.status,
            style: paper.style,
            parts: paper.parts,
            image: paper.image,
            model: paper.model,
            download: paper.download,
            order: paper.order
        };

        //debugger;

        $http.post(
            "http://cubefusionpapertoys.com/database/papertoys/createPapertoy.php",
            paper,
            config
        ).success(function () {
            getAllPapertoys(paper.anime);
            me.cancel();
        });
    };

    var deletePapertoyDB = function (id) {
        $http.post(
            "http://cubefusionpapertoys.com/database/papertoys/deletePapertoy.php",
            {
                id: id
            },
            config
        ).success(function () {
                getAllPapertoys();
                me.cancel();
            });
    };

    var getAllAnimes = function () {
        $http.post(
            "http://cubefusionpapertoys.com/database/anime/getAllAnimes.php",
            {},
            config
        ).success(function (response) {
                for (var i = 0; i < response.animes.length; i++) {
                    me.animeList.push(response.animes[i].name);
                }
                me.animeListComplete = response.animes;
            });
    };

    getAllAnimes();
});