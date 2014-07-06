import Ember from 'ember';
import App from '../app';

export default Ember.Controller.extend({
  authManager: App.AuthManager,

  currentUser: function() {
    return App.AuthManager.get('apiKey.user');
  }.property('authManager.apiKey'),

  isAuthenticated: function() {
    return App.AuthManager.isAuthenticated();
  }.property('authManager.apiKey')
});
