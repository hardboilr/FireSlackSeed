angular.module('angularfireSlackApp')
  .factory('Users', function ($firebaseArray, $firebaseObject, FirebaseUrl) {
    var usersRef = new Firebase(FirebaseUrl + 'users'); // create storageNode for users in firebase db.
    var connectedRef = new Firebase(FirebaseUrl + 'info/connected');
    var users = $firebaseArray(usersRef); // get all users from db


    var Users = {
      getProfile: function (uid) {
        return $firebaseObject(usersRef.child(uid)); // get specific user, based on userId (uid)
      },
      getDisplayName: function (uid) {
        return users.$getRecord(uid).displayName; // get user from memory and pick out displayName
      },
      getGravatar: function (uid) {
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },

      setOnline: function (uid) {
        var connected = $firebaseObject(connectedRef);
        var online = $firebaseArray(usersRef.child(uid + '/online'));

        connected.$watch(function () {
          if (connected.$value === true) {
            online.$add(true).then(function (connectedRef) {
              connectedRef.onDisconnect().remove();
            });
          }
        });
      },

      all: users
    };

    return Users;
  });
