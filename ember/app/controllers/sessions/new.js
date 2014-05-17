import App from '../../app';

export default Ember.ObjectController.extend({
  actions: {
    loginUser: function() {
      var router = this.get('target');
      var data = this.getProperties('username_or_email', 'password');

      $.post('api/session', data, function(results) {
        App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id);
        router.transitionTo('index');
      });
    }
  }
});
