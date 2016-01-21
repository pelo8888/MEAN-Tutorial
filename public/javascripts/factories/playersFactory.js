app.factory('players', ['$http', 'auth',
  function($http, auth) {
    var o = {
      players: []
    };

    //Get all player from mongodb
    o.getAll = function() {
      return $http.get('/players').success(function(data) {
        angular.copy(data, o.players);
      });
    };

    //uses the router.post in index.js to post a new player mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    o.create = function(player) {
      return $http.post('/players', player, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function(data) {
        o.players.push(data);
      });
    };

    //Increment the number of wins to a player.
    //In the success method it increment the number in the factory too
    o.addVictory = function(player) {
      return $http.put('/players/' + player._id + '/incrementwins', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function(data) {
        player.wins += 1;
      });
    };

    //Find a single player from the server
    o.findByUsername = function(username) {
      //use the express route to grab this player and return the response
      //from that route, which is a json of the post data
      //.then is a promise, a kind of newly native thing in JS that upon cursory research
      //looks friggin sweet;
      return $http.get('/players/' + username).then(function(res) {
        return res.data;
      });
    };

    return o;
  }
]);
