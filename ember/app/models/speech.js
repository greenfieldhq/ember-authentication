export default DS.Model.extend({
  name: DS.attr('string'),
  speaker: DS.belongsTo('speaker', {embedded: 'always', async: true})
});
