import Ember from 'ember';

export default Ember.Controller.extend({

	init() {
		$(window).scrollTop(0);
	},

	actions: {
		transitionToExit() {
			this.transitionToRoute('done', this.get('page.id'));
		}

	// actions{}
	}
});
