import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['index'],
	showSecondSection: null,
	showThirdSection: null,
	showFourthSection: null,
	showFifthSection: null,
	showSixthSection: null,
	showEighthSection: null,
	showNinthSection: null,
	showEleventhSection: null,
	showTwelfthSection: null,

	showSection(section, that) {
		var sectionCaps = section.capitalize();
		var windowHeight = that.$(window).height();
		var scrollBottom = that.$(window).scrollTop() + windowHeight;
		var sectionTop = that.$(`.${section}-section`).offset().top;
		

		if ((scrollBottom >= (sectionTop - windowHeight / 3)) && (that.$(window).scrollTop() < sectionTop + (windowHeight * 1.5))) {
				that.set(`show${sectionCaps}Section`, true);
			} else {
				that.set(`show${sectionCaps}Section`, false);
			}
	},



	init(){
		this._super();
		this.set('showSecondSection', false);
		this.set('showThirdSection', false);
		this.set('showFourthSection', false);
		this.set('showFifthSection', false);
		this.set('showSixthSection', false);
		this.set('showEighthSection', false);
		this.set('showNinthSection', false);
		this.set('showEleventhSection', false);
		this.set('showTwelfthSection', false);
	},

	scrollMoveEvent: function() {
		this.$(window).scroll(() => {

			this.get('showSection')('second', this);
			this.get('showSection')('third', this);
			this.get('showSection')('fourth', this);
			this.get('showSection')('fifth', this);
			this.get('showSection')('sixth', this);
			this.get('showSection')('eighth', this);
			this.get('showSection')('ninth', this);
			this.get('showSection')('eleventh', this);
			this.get('showSection')('twelfth', this);

		});
	}.on('didRender'),

	willDestroyElement() {
		this.$(window).off('scroll');
	}
});
