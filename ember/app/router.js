var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('speakers', function() {
    this.route('show', {path: ':speaker_id'});
  });
  this.resource('speeches', function() {
    this.route('show', {path: ':speech_id'});
  });
  this.resource('sessions', function() {
    this.route('new');
  });
  this.resource('users', function() {
    this.route('new');
  });
  this.route('top_secret');
});

export default Router;
