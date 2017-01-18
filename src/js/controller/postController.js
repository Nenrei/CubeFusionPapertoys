/**
 * Created by Enman on 06/07/2016.
 */

angular.module("myApp").controller("postCtrl", function ($http) {

    var me = this;

    me.postsList = null;




    var config= {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
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




    getPosts();
});

























