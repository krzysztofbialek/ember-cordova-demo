// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    hodor: { refreshModel: true }
  },

  model(params) {
    return [];
  }

});
