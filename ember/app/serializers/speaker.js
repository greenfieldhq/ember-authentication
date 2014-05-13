export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    speeches: {embedded: 'always'}
  }
});
