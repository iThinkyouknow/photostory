import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['text-formatter'],
	classNameBindings: ['display'],
	colorValue: '#ffffff',
	
	actions: {

		mouseEnter(font) {
			this.get('hover')(font);
		},

		mouseLeave() {
			this.get('mouseLeft')();
		},

		select(font) {
			this.get('selected')(font);
		},

		focusRemain(){
			this.get('remainFocused')();
		},

		fontAction(action) {
			this.get('fontSizeStyleActions')(action);
		},

		selectColor() {
			this.get('colorSelect')(this.get('colorValue'));
		}

//actions {}
	}
	
});
