/**
 * Created by Enman on 06/08/2016.
 */
angular.module("myApp").controller("adminPostsController", function ($http, service, $window) {

    var me = this;

    me.postsList = [];
    me.categoryList = [];

    me.currentView = 'view/adminComponents/adminPosts/listPosts.html';
    me.currentPost = {};
    me.title = "";

    me.test = "asdasdasdasd<br>dfsdfsdf";



    me.openCreatePanel = function () {
        me.currentPost = {
            id: 0,
            title: null,
            shortTitle: null,
            categoryId: 0,
            category: null,
            tags: null,
            text: null,
            shortText: null,
            autor: null,
            image: null,
            idPaper: 0,
            creationDate: new Date()
        };
        me.mode = "CREATE";
        me.currentView = 'view/adminComponents/adminPosts/crudPosts.html';
    };

    me.openUpdatePanel = function (post) {
        me.currentPost = post;
        me.mode = "EDIT";
        me.currentView = 'view/adminComponents/adminPosts/crudPosts.html';
    };


    me.save = function(){
        createPost();
    };

    me.cancel = function () {
        me.currentPaper = null;
        me.currentView = 'view/adminComponents/adminPosts/listPosts.html';
    };

//__________________________________________________________________________________
//________________    DATABASE                          ____________________________
//__________________________________________________________________________________

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };


    var createPost = function () {

        var newPost = {
            autor: 1,//me.currentPost.autor,
            title: me.currentPost.title,
            shortTitle: me.currentPost.shortTitle,
            category: Number(me.currentPost.category.id),
            tags: me.currentPost.tags,
            text: me.currentPost.text
        };

        $http.post(
            "http://cubefusionpapertoys.com/database/posts/createPost.php",
            newPost,
            config
        ).success(function () {
            me.cancel();
        });
    };





    var getPosts = function () {
        $http.post(
            "http://cubefusionpapertoys.com/database/posts/getAllPosts.php",
            {},
            config
        ).success(function (response) {
            for (var i = 0; i < response.posts.length; i++) {
                response.posts[i].creationDate = new Date(response.posts[i].creationDate);
            }
            me.postsList = response.posts;
        });
    };

    var getCategories = function () {
        $http.post(
            "http://cubefusionpapertoys.com/database/posts/getAllCategories.php",
            {},
            config
        ).success(function (response) {
            me.categoryList = response.categories;
        });
    };



    getCategories();
    getPosts();

});