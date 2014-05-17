import App from '../../app';

export default Ember.ObjectController.extend({
  actions: {
    createUser: function() {
      var router = this.get('target');
      var data = this.getProperties('name', 'email', 'username', 'password', 'password_confirmation');
      //var user = this.get('model');

      $.post('api/users', { user: data }, function(results) {
        App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id);
        router.transitionTo('index');
      });
    }
  }
});
