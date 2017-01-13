import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  admin: DS.attr('boolean', {default: false}),
  pages: DS.hasMany('page', {async: true})
});
