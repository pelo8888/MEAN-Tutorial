app.controller('gameCtrl', ['$scope', 'posts', 'auth',
  function($scope, posts, auth) {
    $scope.posts = posts.posts;
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.moves = [{
      player1: 'Piedra',
      player2: 'Tijera',
      winner: {
        username: 'Pelo'
      }
    }, {
      player1: 'Papel',
      player2: 'Papel',
      winner: undefined
    }, {
      player1: 'Papel',
      player2: 'Tijera',
      winner: {
        username: 'Chile'
      }
    }]
  }
]);
