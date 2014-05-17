import ApiKey from './models/api-key';
import App from './app';
//import Foo from './routes/sessions/new'

export default Ember.Object.extend({
  // Load the current user if the cookies exist and is valid
  init: function() {
    this._super();
    var accessToken = $.cookie('access_token');
    var authUserId  = $.cookie('auth_user');
    if (!Ember.isEmpty(accessToken) && !Ember.isEmpty(authUserId)) {
      this.authenticate(accessToken, authUserId);
    }
  },

  // Determine if the user is currently authenticated.
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('apiKey.accessToken')) && !Ember.isEmpty(this.get('apiKey.user'));
  },

  // Authenticate the user. Once they are authenticated, set the access token to be submitted with all
  // future AJAX requests to the server.
  authenticate: function(accessToken, userId) {
    $.ajaxSetup({
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    var $this = this;
    this.get('store').find('user', userId).then(function(user) {
      $this.set('apiKey', ApiKey.create({
        accessToken: accessToken,
        user: user
      }));
    });
  },

  // Log out the user
  reset: function() {
    //App.__container__.lookup("route:application").transitionTo('sessions.new');
    debugger;
    //Foo.transitionTo('sessions.new');
    Ember.run.sync();
    Ember.run.next(this, function(){
      this.set('apiKey', null);
      $.ajaxSetup({
        headers: { 'Authorization': 'Bearer none' }
      });
    });
  },

  // Ensure that when the apiKey changes, we store the data in cookies in order for us to load
  // the user when the browser is refreshed.
  apiKeyObserver: function() {
    if (Ember.isEmpty(this.get('apiKey'))) {
      $.removeCookie('access_token');
      $.removeCookie('auth_user');
    } else {
      $.cookie('access_token', this.get('apiKey.accessToken'));
      $.cookie('auth_user', this.get('apiKey.user.id'));
    }
  }.observes('apiKey')
});

// Reset the authentication if any ember data request returns a 401 unauthorized error
DS.rejectionHandler = function(reason) {
  if (reason.status === 401) {
    App.AuthManager.reset();
  }
  throw reason;
};
