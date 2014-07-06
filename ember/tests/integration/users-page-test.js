import startApp from 'greenfield/tests/helpers/start-app';

var App, server;

module('Integration - User Page', {
  setup: function() {
    App = startApp();
    var users = [
      {
        id: 1,
        name: 'Bugs Bunny'
      },
      {
        id: 2,
        name: 'Wile E. Coyote'
      },
      {
        id: 3,
        name: 'Yosemite Sam'
      }
    ];

    server = new Pretender(function() {
      this.get('/api/users', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users})];
      });

      this.get('/api/users/:id', function(request) {
        var user = users.find(function(user) {
          if (user.id === parseInt(request.params.id, 10)) {
            return user;
          }
        });

        return [200, {"Content-Type": "application/json"}, JSON.stringify({user: user})];
      });
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should allow navigation to the users page from the landing page', function() {
  visit('/').then(function() {
    click('a:contains("Users")').then(function() {
      equal(find('h3').text(), 'Users');
    });
  });
});

test('Should list all users', function() {
  visit('/users').then(function() {
    equal(find('a:contains("Bugs Bunny")').length, 1);
    equal(find('a:contains("Wile E. Coyote")').length, 1);
    equal(find('a:contains("Yosemite Sam")').length, 1);
  });
});

test('Should be able to navigate to a user page', function() {
  visit('/users').then(function() {
    click('a:contains("Bugs Bunny")').then(function() {
      equal(find('h4').text(), 'Bugs Bunny');
    });
  });
});

test('Should be able visit a user page', function() {
  visit('/users/1').then(function() {
    equal(find('h4').text(), 'Bugs Bunny');
  });
});
