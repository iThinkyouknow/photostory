import DS from 'ember-data';

export default DS.Model.extend({
  photoURL: DS.attr('string'),
  photoFileName: DS.attr('string'),
  bgClassNames: DS.attr(),
  photoClassNames: DS.attr(),
  textPosition: DS.attr(),
  textEffects: DS.attr(),
  text: DS.attr('string'),

  page: DS.belongsTo('page', {async: true})

});
