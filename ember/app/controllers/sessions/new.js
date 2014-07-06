import Ember from 'ember';
import App from '../../app';

export default Ember.ObjectController.extend({
  attemptedTransition: null,

  actions: {
    loginUser: function() {
      var self = this;
      var router = this.get('target');
      var data = this.getProperties('username_or_email', 'password');
      var attemptedTrans = this.get('attemptedTransition');

      $.post('api/session', data, function(results) {
        App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id);
        //router.transitionTo('index');
        if (attemptedTrans) {
          attemptedTrans.retry();
          self.set('attemptedTransition', null);
        } else {
          router.transitionTo('index');
        }
      });
    }
  }
});
