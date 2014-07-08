import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GreenfieldENV.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('users', function() {
    this.route('show', { path: ':user_id' });
    this.route('new');
  });
  this.resource('cars', function() {
    this.route('show', { path: ':car_id' });
  });
  this.resource('sessions', function() {
    this.route('new');
  });
  this.route('top_secret');
  this.route('uploads');
});

export default Router;
