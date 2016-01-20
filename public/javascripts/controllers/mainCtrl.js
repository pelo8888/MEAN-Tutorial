app.controller('MainCtrl', ['$scope', 'posts', 'players', 'auth',
  function ($scope, posts, players, auth) {
    $scope.posts = posts.posts;
    $scope.players = players.players;
    $scope.isLoggedIn = auth.isLoggedIn;


    $scope.start = function () {
      var usr1 = $scope.username1.toLowerCase(),
        usr2 = $scope.username2.toLowerCase(),
        promise1 = undefined,
        promise2 = undefined;

      if (usr1 === '' || usr2 === '') {
        alert('Players names can not be empty.');
        return;
      }

      //Search for the players. If exist then load from database, 
      // otherwise a new player is created.
      promise1 = players.findByUsername(usr1);
      promise2 = players.findByUsername(usr2);

      promise1.then(function (data) {
        if (data === 'null') {
          players.create({
            username: usr1
          });
        }
      });

      promise2.then(function (data) {
        if (data === 'null') {
          players.create({
            username: usr2
          });
        }
      });

      //clear the values
      $scope.username1 = '';
      $scope.username2 = '';
    };

    $scope.upvote = function (post) {
      //our post factory has an upvote() function in it
      //we're just calling this using the post we have
      console.log('Upvoting:' + post.title + "votes before:" + post.upvotes);
      posts.upvote(post);
    };

    $scope.downvote = function (post) {
      posts.downvote(post);
    };
  }
]);