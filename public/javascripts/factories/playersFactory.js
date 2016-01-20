app.factory('players', ['$http', 'auth',
  function($http, auth) {
    var o = {
      players: []
    };

    o.getAll = function() {
      return $http.get('/players').success(function(data) {
        angular.copy(data, o.players);
      });
    };
    //now we'll need to create new posts
    //uses the router.post in index.js to post a new Post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    //sweet!
    o.create = function(player) {
      return $http.post('/players', player, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function(data) {
        o.players.push(data);
      });
    };

    o.addVictory = function(player) {
      return $http.put('/players/' + player._id + '/incrementwins', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function(data) {
        player.wins += 1;
      });
    };

    //grab a single post from the server
    o.findByUsername = function(username) {
      //use the express route to grab this post and return the response
      //from that route, which is a json of the post data
      //.then is a promise, a kind of newly native thing in JS that upon cursory research
      //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
      return $http.get('/players/' + username).then(function(res) {
        return res.data;
      });
    };


    //grab a single post from the server
    o.get = function(id) {
      //use the express route to grab this post and return the response
      //from that route, which is a json of the post data
      //.then is a promise, a kind of newly native thing in JS that upon cursory research
      //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
      return $http.get('/players/' + id).then(function(res) {
        return res.data;
      });
    };

    return o;
  }
]);
