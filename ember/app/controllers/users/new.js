import App from '../../app';

export default Ember.ObjectController.extend({
  actions: {
    createUser: function() {
      var router = this.get('target');
      var data = this.getProperties('name', 'email', 'username', 'password', 'password_confirmation');
      var user = this.get('model');

      /* jshint unused:false */
      $.post('api/users', { user: data }, function(results) {
        App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id);
        router.transitionTo('index');
      }).fail(function(jqxhr, textStatus, error ) {
        if (jqxhr.status === 422) {
          var errs = JSON.parse(jqxhr.responseText);
          user.set('errors', errs.errors);
        }
      });
    }
  }
});
