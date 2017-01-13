import Ember from 'ember';

export default Ember.Route.extend({
	snapshotID: '',
	page: '',
	
	beforeModel() {
			return this.get('store').createRecord('page',  {
				photoSections: []
				
			}).save().then((result) => {
				this.set('snapshotID', result.id);
				this.set('page', this.get('store').findRecord('page', this.get('snapshotID')));
				});
		
	},

	model() { 
		 return this.get('page');
	
	},

setupController(controller, model) {
	this._super(controller, model);
	controller.set('page', this.get('page'));
	
	controller.set('snapshotID', this.get('snapshotID'));
	// controller.set('page', this.get('store').findRecord('page', '-KSuKy-ctL4-j5aUQ6UM'));
	controller.set('shouldFix', 'fixed');
}

});
