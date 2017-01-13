import Ember from 'ember';
const { getOwner } = Ember;

export default Ember.Component.extend({
	
	tagName: 'nav',
	
	classNameBindings: ['isMini', 'isDark' ,'hiding'],
	
	hiding: Ember.computed.not('display'),

	isMini: null,

	isDark: null,

	display: null,

	timeoutID: null,

	actionLink: null,

	actionParams: null,

	init() {

		this._super();
		this.set('timeoutID', '');
		this.set('display', true);
		this.set('isMini', '');
		this.set('isDark', '');


	}, 

	didReceiveAttrs() {
		this._super(...arguments);
		
		if (this.get('path') !== 'index'){

			this.set('isMini', 'mini-nav-bar');

			if (this.get('path') === 'done'){
				this.set('isDark', 'dark-gray-bar');
			} else {
				this.set('isDark', null);
			}

		}

		if (this.get('path') === 'create'){
			var page = getOwner(this).lookup('controller:create').page;

			this.set('actionText', 'Preview');
			this.set('actionLink', 'display');

			page.then((result) => {
				this.set('actionParams', result.id);
			});
			

		} else {

			this.set('actionText', 'Create');
			this.set('actionLink', 'create');
			this.set('actionParams', null);

		}
		
	},

	mouseMoveEvent: function(event) {

		this.$(window).mousemove((event) => {

			if (this.get('path') === 'index'){
				if (this.$(window).scrollTop() >=  (this.$(window).height() * 0.9)) {

					this.set('isMini', 'mini-nav-bar');

				} else {

					this.set('isMini', '');

				}
			}

			if((event.pageY - this.$(window).scrollTop()) <= (this.$(window).height() * 0.2)) {
				
				this.set('display', true);

			} else {

				this.set('display', false);
			}

		});

	}.on('didRender'),

	actions: {
		fadeBar() {
			this.set('timeoutID', setTimeout(() => {this.set('display', false);}, 500));
		},

		persistBar() {
			clearTimeout(this.get('timeoutID'));
		}

	//actions {}
}



});
