angular.module('angularfireSlackApp')
  .factory('Messages', function ($firebaseArray, FirebaseUrl) {
    var channelMessagesRef = new Firebase(FirebaseUrl + 'channelMessages');
    var userMessagesRef = new Firebase(FirebaseUrl + 'userMessages');


    return {
      forChannel: function (channelId) {
        return $firebaseArray(channelMessagesRef.child(channelId));
      }
    };

    return {
      forUsers: function (uid1, uid2) {
        // user with lower id will hold the conversation
        var path = uid1 < uid2 ? uid1 + '/' + uid2 : uid2 + '/' + uid1;

        return $firebaseArray(userMessagesRef.child(path));
      }
    };
  });
