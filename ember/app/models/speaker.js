export default DS.Model.extend({
  name: DS.attr('string'),
  speeches: DS.hasMany('speech', {embedded: 'always', async: true})
});
