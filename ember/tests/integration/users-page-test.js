import startApp from 'greenfield/tests/helpers/start-app';

var App, server;

module('Integration - User Page', {
  setup: function() {
    App = startApp();
    var users = [
      {
        id: 1,
        name: 'Ryan Tremaine',
        
      },
      {
        id: 2,
        name: 'Mike Munroe'
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

      this.post('/api/session', function(request) {
        return [201, {"Content-Type": "application/json"}, JSON.stringify({api_key: {id: 7, access_token: 'b8de2c1d0b02a9e02bdcd9037a03a744', user_id: 1}})];
      });
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should allow navigation to the users page from the landing page', function() {
  login('rtremaine', 'rt');
  visit('/').then(function() {
    click('a:contains("Users")').then(function() {
      equal(find('h3').text(), 'Users');
    });
  });
});

test('Should list all users', function() {
  login('rtremaine', 'rt');
  visit('/users').then(function() {
    equal(find('a:contains("Ryan Tremaine")').length, 1);
    equal(find('a:contains("Mike Munroe")').length, 1);
  });
});

test('Should be able to navigate to a user page', function() {
  login('rtremaine', 'rt');
  visit('/users').then(function() {
    click('a:contains("Ryan Tremaine")').then(function() {
      equal(find('h4').text(), 'Ryan Tremaine');
    });
  });
});

test('Should be able visit a user page', function() {
  visit('/users/1').then(function() {
    equal(find('h4').text(), 'Ryan Tremaine');
  });
});

function login(username, password) {
  visit('/sessions/new').then(function() {
    fillIn('input.username', 'rtremaine').then(function() {
      fillIn('.password', 'rt').then(function() {
        click("button.login");
      });
    });
  });
}
