import DS from 'ember-data';

export default DS.Model.extend({
  make: DS.attr('string'),
  model: DS.attr('string'),
  year: DS.attr('number'),
  color: DS.attr('string'),

  name: function() {
    return this.get('make') + ' ' + this.get('model');
  }.property('make')
});

