app.controller('gameCtrl', ['$scope', 'game', 'auth',
  function($scope, game, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.Game = game.Game;
    $scope.Game.moves = [];
    $scope.lastMove = {
      player1: undefined,
      player2: undefined,
      winner: undefined
    };
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

    $scope.Attack = function() {
      if ($scope.selected) {
        if ($scope.lastMove.player1 === undefined) {
          $scope.lastMove.player1 = $scope.selected;
        } else if ($scope.lastMove.player2 === undefined) {
          $scope.lastMove.player2 = $scope.selected;
        }

        //Si ambos jugadores movieron entonces la jugada termio
        if ($scope.lastMove.player1 && $scope.lastMove.player2) {
          $scope.finishMove();
        }
      };
    };

    $scope.finishMove = function() {
      var move1 = $scope.lastMove.player1,
        move2 = $scope.lastMove.player2;

      if (move1.kills === move2.name) {
        $scope.lastMove.winner = $scope.Game.Player1;
      } else if (move2.kills === move1.name) {
        $scope.lastMove.winner = $scope.Game.Player2;
      }
      $scope.Game.moves.push($scope.lastMove);
      $scope.lastMove = {
        player1: undefined,
        player2: undefined,
        winner: undefined
      };
    };
  }
]);
