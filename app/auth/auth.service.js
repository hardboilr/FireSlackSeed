angular.module('angularfireSlackApp')
  .factory('Auth', function ($firebaseAuth, FirebaseUrl) {
    // fetch my firebase-backend. Create authentication-object and return it from the service.
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);

    return auth;
  });
