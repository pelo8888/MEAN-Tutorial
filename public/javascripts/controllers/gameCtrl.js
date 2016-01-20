app.controller('gameCtrl', ['$scope', 'posts', 'auth', 'game',
  function ($scope, posts, game, auth) {
    $scope.posts = posts.posts;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.Game = game.Game;
    $scope.options = [{
      name: 'Paper',
      kills: 'Rock'
    }, {
      name: 'Rock',
      kills: 'Scissors'
    }, {
      name: 'Scissors',
      kills: 'Paper'
    }];

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