app.factory('game', ['$window', '$state',

  function ($window, $state) {
    var o = {
      Player1: undefined,
      Player2: undefined,
      moves: [],
      winner: undefined
    };


    o.savePlayer1 = function () {
      $window.localStorage['game-of-drones-player1'] = JSON.stringify(this.Player1);
    };

    o.savePlayer2 = function () {
      $window.localStorage['game-of-drones-player2'] = JSON.stringify(this.Player1);
    };

    o.saveWinner = function () {
      $window.localStorage['game-of-drones-winner'] = JSON.stringify(this.winner);
    };

    o.saveStatus = function () {
      $window.localStorage['game-of-drones-player1'] = JSON.stringify(this.Player1);
      $window.localStorage['game-of-drones-player2'] = JSON.stringify(this.Player2);
      $window.localStorage['game-of-drones-moves'] = JSON.stringify(this.moves);
      $window.localStorage['game-of-drones-winner'] = JSON.stringify(this.winner);
    };

    o.getStorage = function () {
      var player1 = $window.localStorage['game-of-drones-player1'] || 'undefined',
        player2 = $window.localStorage['game-of-drones-player2'] || 'undefined',
        moves = $window.localStorage['game-of-drones-moves'] || 'undefined',
        winner = $window.localStorage['game-of-drones-winner'] || 'undefined';

      this.Player1 = player1 !== 'undefined' ? JSON.parse(player1) : undefined;
      this.Player2 = player2 !== 'undefined' ? JSON.parse(player2) : undefined;
      this.moves = moves !== 'undefined' ? JSON.parse(moves) : [];
      this.winner = winner !== 'undefined' ? JSON.parse(winner) : undefined;

      //If some player is not defined, redirect to start page
      if ($state.current.name === 'winner') {
        if (this.winner === undefined) {
          $state.go('start');
        }
      } else if (this.Player1 === undefined || this.Player2 === undefined) {
        $state.go('start');
      }
    }

    o.removeWinner = function () {
      $window.localStorage.removeItem('game-of-drones-winner');
    }

    o.removeGameStorage = function () {
      console.error(this);
      $window.localStorage.removeItem('game-of-drones-player1');
      $window.localStorage.removeItem('game-of-drones-player2');
      $window.localStorage.removeItem('game-of-drones-moves');
      // $window.localStorage.removeItem('game-of-drones-winner');
    }

    return o;
  }
]);
