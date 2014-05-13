import startApp from 'greenfield-base/tests/helpers/start-app';

var App, server;

module('Integration - Landing Page', {
  setup: function() {
    App = startApp();
    var speakers = [
      {
        id: 1,
        name: 'Bugs Bunny',
        speeches: [{id: 1, name: "Carrots, the other white meat.", speaker_id: 1, created_at: "2014-05-10T17:38:55.000Z", updated_at: "2014-05-10T17:38:55.000Z"}]
      },
      {
        id: 2,
        name: 'Wile E. Coyote',
        speeches: [{id: 2, name: "Always look down!", speaker_id: 2, created_at: "2014-05-10T17:38:55.000Z", updated_at: "2014-05-10T17:38:55.000Z"}]
      },
      {
        id: 4,
        name: 'Yosemite Sam',
        speeches: [{id: 3, name: "Mudflaps and bad tattoos.", speaker_id: 3, created_at: "2014-05-10T17:38:55.000Z", updated_at: "2014-05-10T17:38:55.000Z"}]
      }
    ];

    server = new Pretender(function() {
      this.get('/api/speakers', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers})];
      });

      this.get('/api/speakers/:id', function(request) {
        var speaker = speakers.find(function(speaker) {
          if (speaker.id === parseInt(request.params.id, 10)) {
            return speaker;
          }
        });

        return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: speaker})];
      });
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should allow navigation to the speakers page from the landing page', function() {
  visit('/').then(function() {
    click('a:contains("Speakers")').then(function() {
      equal(find('h3').text(), 'Speakers');
    });
  });
});

test('Should list all speakers', function() {
  visit('/speakers').then(function() {
    ok(find('a:contains("Bugs Bunny")'));
    ok(find('a:contains("Wile E. Coyote")'));
    ok(find('a:contains("Yosemite Sam")'));
  });
});

test('Should be able to navigate to a speaker page', function() {
  visit('/speakers').then(function() {
    click('a:contains("Bugs Bunny")').then(function() {
      equal(find('h4').text(), 'Bugs Bunny');
      ok(find('a:contains("Carrots, the other white meat.")'));
    });
  });
});

test('Should be able visit a speaker page', function() {
  visit('/speakers/1').then(function() {
    equal(find('h4').text(), 'Bugs Bunny');
  });
});
