import Ember from 'ember';

export default Ember.Controller.extend({
	//page was sent by the router


	actions: {
			addPhotoSection() {

				if (this.get('model.length') < 12 || !this.get('model.length')){

				var x = this.get('store').createRecord('photo-section', {
					photoURL: '',
					bgClassNames: '',
  				photoClassNames: '',
  				textPosition: '',
  				textEffects: '',
  				text: '',
  				page: this.get('page')
				});

				x.save().then(() => {
					this.get('page').then((result) => {
						result.save().then(() => {
							this.set('model', this.get('page'));
						});
					});

				});
			}
				
					// this.set('model', this.get('store').findRecord('page', this.get('snapshotID')).then((result) => {
					// 	return result.photoSections;
					// })
					// );

					// this.set('model', this.get('store').findAll('photo-section'));
				
			},

			uploadPhotoURL(url, fileName, sectionID) {
				this.get('store').findRecord('photo-section', sectionID).then((result) => {
					result.set('photoURL', url);
					result.set('photoFileName', fileName);
					result.save();
				});
			},

			saveAttribute(id, bgClassParams, photoClassParams, tpParams, teParams, textParams) {
					this.get('store').findRecord('photo-section', id).then((result) => {
					result.set('bgClassNames', bgClassParams);
					result.set('photoClassNames', photoClassParams);
					result.set('textPosition', tpParams);
					result.set('textEffects', teParams);
					result.set('text', textParams);

				  result.save();
				});
			},

			deletePhoto(id) {
				this.get('store').findRecord('photo-section', id, { backgroundReload: false }).then((result) => {
					result.destroyRecord();
				});
			}

			//actions{}
		}
});
