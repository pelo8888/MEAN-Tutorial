app.controller('MainCtrl', ['$scope', 'posts', 'auth',
  function($scope, posts, auth) {
    $scope.posts = posts.posts;
    $scope.isLoggedIn = auth.isLoggedIn;
    //setting title to blank here to prevent empty posts
    $scope.title = '';

    $scope.addPost = function() {
      if ($scope.title === '') {
        return;
      }
      posts.create({
        title: $scope.title,
        link: $scope.link,
      });
      //clear the values
      $scope.title = '';
      $scope.link = '';
    };

    $scope.upvote = function(post) {
      //our post factory has an upvote() function in it
      //we're just calling this using the post we have
      console.log('Upvoting:' + post.title + "votes before:" + post.upvotes);
      posts.upvote(post);
    };
    $scope.downvote = function(post) {
      posts.downvote(post);
    };
  }
]);
