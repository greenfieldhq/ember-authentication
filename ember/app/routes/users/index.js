import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model: function() {
    return this.store.find('user');
  }
});
