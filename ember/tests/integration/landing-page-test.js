import startApp from 'greenfield/tests/helpers/start-app';

var App;

module('Integration - Landing Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should show user the landing page', function() {
  visit('/').then(function() {
    equal(find('p#welcome').text(), 'Hello World! Welcome to greenfield!');
  });
});
