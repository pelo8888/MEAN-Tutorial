var app = angular.module('gameOfDrones', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts',
          function (posts) {
            return posts.getAll();
          }
        ]
      }
    })

    .state('start', {
      url: '/start',
      templateUrl: '/start.html',
      controller: 'MainCtrl',
      resolve: {
        post: ['$stateParams', 'players',
          function ($stateParams, players) {
            return players.getAll();
          }
        ]
      }
    })

    .state('playing', {
      url: '/playing',
      templateUrl: '/playing.html',
      controller: 'gameCtrl'
    })

    .state('winner', {
      url: '/winner',
      templateUrl: '/winner.html',
      controller: 'MainCtrl'
    })

    .state('posts', {
      url: '/posts/:id',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts',
          function ($stateParams, posts) {
            return posts.get($stateParams.id);
          }
        ]
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth',
        function ($state, auth) {
          if (auth.isLoggedIn()) {
            $state.go('home');
          }
        }
      ]

    })

    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth',
        function ($state, auth) {
          if (auth.isLoggedIn()) {
            $state.go('home');
          }
        }
      ]
    });

    $urlRouterProvider.otherwise('home');
  }
]);