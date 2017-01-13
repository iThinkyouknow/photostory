import Ember from 'ember';

export default Ember.Route.extend({
	firebaseApp: Ember.inject.service(),
	parameters: null,

	photoRef(fileName, that) {
		var storage = that.get('firebaseApp').storage();
		var storageRef = storage.ref();
		var imagesRef = storageRef.child('images');

		return imagesRef.child(fileName);
	},

	deletePhoto(photoRef) {
		//delete from storage, not database
		photoRef.delete().then(() => {
			console.log('Photo was deleted!');
			
		}).catch((e) => {
	  			// Uh-oh, an error occurred!
	  			
	  			console.log(e);
	  			
	  		});
	},

	model(params) {
		this.set('parameters', params);
	// model {}
},

afterModel() {
	var params = this.get('parameters');

	this.get('store').findRecord('page', params.page_id, { backgroundReload: false }).then((result) => {
		var resultOne = result;
				// var deletions = 
				result.get('photoSections').then((resultTwo) => {

					 var deletions = resultTwo.map((photoSection) => {

						var photoReference = this.get('photoRef')(photoSection.get('photoFileName'), this);

						this.get('deletePhoto')(photoReference);

						return photoSection.destroyRecord().then(() => {
							return;
						}).catch((e) => {
							return;
						});
					// map {}
					});

					Ember.RSVP.all(deletions).then(() => {
						resultOne.destroyRecord().then(() => {
							console.log('deleted');
						}).catch((e) => {
							console.log(e);
						});
					});

					//result {}
				});
			});

		// aftermodel {}
	}

	// route.extend {}
});
