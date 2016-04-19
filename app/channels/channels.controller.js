angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', function ($state, Auth, Users, profile, channels) {
    var channelsCtrl = this;

    Users.setOnline(profile.$id);

    channelsCtrl.profile = profile;
    channelsCtrl.channels = channels;
    channelsCtrl.users = Users.all;

    channelsCtrl.getDisplayName = Users.getDisplayName;
    channelsCtrl.getGravatar = Users.getGravatar;

    channelsCtrl.logout = function () {
      channelsCtrl.profile.online = null;
      // persist state to server
      channelsCtrl.profile.$save().then(function () {
        Auth.$unauth();
        $state.go('home');
      });
    };

    channelsCtrl.newChannel = {
      name: ''
    };

    channelsCtrl.createChannel = function () {
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function (ref) {
        // if success, then reset newChannel object (as it has been saved to firebase db via $add)
        $state.go('channels.messages', {channelId: ref.key()})
      });
    };
  });
