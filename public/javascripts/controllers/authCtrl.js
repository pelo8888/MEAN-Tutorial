app.controller('AuthCtrl', ['$scope', '$state', 'auth',
  function($scope, $state, auth) {
    $scope.user = {};

    //Convert username and password to lowercase before register the new user
    $scope.register = function() {
      $scope.user.username = $scope.user.username.toLowerCase();
      $scope.user.password = $scope.user.password.toLowerCase();
      auth.register($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('start');
      });
    };

    //Convert username and password to lowercase before login.
    $scope.logIn = function() {
      $scope.user.username = $scope.user.username.toLowerCase();
      $scope.user.password = $scope.user.password.toLowerCase();
      auth.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('start');
      });
    };
  }
]);
