app.factory('game', [

  function() {
    var o = {
      Game: {
        Player1: {
          username: 'Player1',
          wins: 1
        },
        Player2: {
          username: 'Player2',
          wins: 2
        },
        moves: []
      }
    };

    o.saveStatus = function(user1, user2) {
      $window.localStorage['game-of-drones-player1'] = user1;
      $window.localStorage['game-of-drones-player2'] = user2;
      $window.localStorage['game-of-drones-moves'] = user2;
    };

    o.getStorage = function() {
      o.Game.Player1 = $window.localStorage['game-of-drones-player1'];
      o.Game.Player2 = $window.localStorage['game-of-drones-player2'];
      o.Game.moves = $window.localStorage['game-of-drones-moves'];
    }

    o.removeGameStorage = function() {
      $window.localStorage.removeItem('game-of-drones-player1');
      $window.localStorage.removeItem('game-of-drones-player2');
      $window.localStorage.removeItem('game-of-drones-moves');
    }

    return o;
  }
]);
