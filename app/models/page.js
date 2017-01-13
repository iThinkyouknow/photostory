import DS from 'ember-data';

export default DS.Model.extend({
  photoSections: DS.hasMany('photo-section', {async: true}),
  user: DS.belongsTo('user', {async: true}),
  isPublic: DS.attr('boolean', {default: false})
});
