app.factory('posts', ['$http', 'auth',
  function ($http, auth) {
    var o = {
      posts: []
    };

    o.getAll = function () {
      return $http.get('/posts').success(function (data) {
        angular.copy(data, o.posts);
      });
    };
    //now we'll need to create new posts
    //uses the router.post in index.js to post a new Post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    //sweet!
    o.create = function (post) {
      return $http.post('/posts', post, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function (data) {
        o.posts.push(data);
      });
    };

    o.upvote = function (post) {
      return $http.put('/posts/' + post._id + '/upvote', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function (data) {
        post.upvotes += 1;
      });
    };
    //downvotes
    o.downvote = function (post) {
      return $http.put('/posts/' + post._id + '/downvote', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function (data) {
        post.upvotes -= 1;
      });
    };
    //grab a single post from the server
    o.get = function (id) {
      //use the express route to grab this post and return the response
      //from that route, which is a json of the post data
      //.then is a promise, a kind of newly native thing in JS that upon cursory research
      //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
      return $http.get('/posts/' + id).then(function (res) {
        return res.data;
      });
    };
    //comments, once again using express
    o.addComment = function (id, comment) {
      return $http.post('/posts/' + id + '/comments', comment, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      });
    };

    o.upvoteComment = function (post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function (data) {
        comment.upvotes += 1;
      });
    };
    //downvote comments
    //I should really consolidate these into one voteHandler function
    o.downvoteComment = function (post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      }).success(function (data) {
        comment.upvotes -= 1;
      });
    };
    return o;
  }
]);