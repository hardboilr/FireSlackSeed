angular.module('angularfireSlackApp')
  .controller('AuthCtrl', function (Auth, $state) {
    var authCtrl = this;

    authCtrl.user = {
      email: '',
      password: ''
    };

    // use firebase-method: 'authWithPassword' to authenticate user, using authCtrl.user credentials.
    // if success, redirect to home, otherwise create error-object.
    authCtrl.login = function () {
      Auth.$authWithPassword(authCtrl.user).then(function (auth) {
        $state.go('home');
      }, function (error) {
        authCtrl.error = error;
      });
    };

    // use firebase-method: 'createUser' to create user, using authCtrl.user credentials.
    // if success, call method 'authCtrl.login()' that uses same credentials to login user,
    // otherwise create error-object.
    authCtrl.register = function () {
      Auth.$createUser(authCtrl.user).then(function (user) {
        authCtrl.login();
      }, function (error) {
        authCtrl.error = error;
      });
    }
  });
