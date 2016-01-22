app.controller('MainCtrl', ['$scope', 'players', 'game', 'auth', '$state',
  function ($scope, players, game, auth, $state) {
    $scope.players = players.players;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.Game = game;

    $scope.Game.getStorage();

    $scope.playAgain = function () {
      $scope.Game.winner = undefined;
      $scope.Game.removeWinner();
      $state.go('start');
    };

    $scope.goPlaying = function () {
      if ($scope.Game.Player1 && $scope.Game.Player2) {
        $state.go('playing');
      }
    };

    $scope.start = function () {
      var usr1 = $scope.username1.toLowerCase(),
        usr2 = $scope.username2.toLowerCase(),
        newUser = false,
        promise1 = undefined,
        promise2 = undefined;

      $scope.Game.initialize();

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
          })
            .then(function (res) {
              $scope.Game.Player1 = res.data;
              $scope.Game.savePlayer1();
              $scope.goPlaying();
            });
        } else {
          $scope.Game.Player1 = data;
          $scope.Game.savePlayer1();
          $scope.goPlaying();
        }
      });

      promise2 = promise2.then(function (data) {
        if (data === 'null') {
          return players.create({
              username: usr2
            })
            .then(function (res) {
              $scope.Game.Player2 = res.data;
              $scope.Game.savePlayer2();
              $scope.goPlaying();
            });
        } else {
          $scope.Game.Player2 = data;
          $scope.Game.savePlayer2();
          $scope.goPlaying();
        }
      });

      Promise.all([promise1, promise2]).then(function () {
        $scope.username1 = '';
        $scope.username2 = '';
      });

    };
  }
]);
