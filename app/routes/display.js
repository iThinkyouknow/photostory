import Ember from 'ember';

export default Ember.Route.extend({
	firebaseApp: Ember.inject.service(),
	page: null,

	photoRef(fileName, that) {
		var storage = that.get('firebaseApp').storage();
		var storageRef = storage.ref();
		var imagesRef = storageRef.child('images');

		return imagesRef.child(fileName);
	},

	

	model(params) {
		return this.get('store').findRecord('page', params.page_id).then((result) => {
			this.set('page', result);
			return result;
		});
	},

	setupController(controller, model) {
		this._super(controller, model);

		controller.set('display', 'hidden');
		controller.set('page', this.get('page'));
		

	},

// route.extend{}
});

//Possible future use
	/*afterModel() {
		$(window).on('beforeunload', () => {
			console.log(`model.id: ${this.get('page.id')}`);
			console.log('beforeunloaddisplay');

			this.get('store').findRecord('page', this.get('page.id')).then((result) => {
				console.log(`result: ${result}`);
				console.log(`result.photoSections: ${result.get('photoSections')}`);

				var deletions = result.get('photoSections').then((resultTwo) => {
					console.log(`resultTwo: ${resultTwo}`);

					 resultTwo.map((photoSection) => {

						console.log(`fileName: ${photoSection.get('photoFileName')}`);

						var photoReference = this.get('photoRef')(photoSection.get('photoFileName'), this);

						console.log(`photoReference: ${photoReference}`);

						this.get('deletePhoto')(photoReference);

						Ember.RSVP.resolve(this.get('deletePhoto')).then(() => {
							console.log('1');
							photoSection.destroyRecord();
						})
						 
							
						
					});
				});

				console.log('2');


				
				Ember.RSVP.resolve(deletions).then(function(matter) {
					console.log(`matter: ${matter}`);
					result.destroyRecord();

				}).catch(function(e) {
   			  // Handle errors
   			});
			});

			console.log('destroyed');

		});
	},

	deletePhoto(photoRef) {
		console.log(`deletePhoto: ${photoRef}`);
		return photoRef.delete().then(() => {
			console.log('Photo was deleted!');
			console.log('a');

			console.log('b');
			return 'a';
		}).catch((error) => {
	  			// Uh-oh, an error occurred!
	  			
	  			console.log(error);
	  			
	  		});

	},*/
