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
});

export default Router;
