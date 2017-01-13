import Ember from 'ember';

function changeEffects(effect, that) {
	
	var x;

	for (var i = 0; i < that.get('effectsArray').length; i++) {
		
		if (that.get('effectsArray')[i] === effect ) {
			x = i;
			
		}
	}

	if (x != undefined) {
		that.get('effectsArray').splice(x, 1);
	} else {
		that.get('effectsArray').push(effect);
	}

	x = undefined;

	that.set('effects', that.get('effectsArray').join(" "));
	that.set('photoSection.photoClassNames', that.get('effects'));
}


function changeBg(effect, that) {

	var y;

	for (var j = 0; j < that.get('bgEffectsArray').length; j++) {
		if (that.get('bgEffectsArray')[j] === effect ) {
			y = j;
			
		}
	}

	if (y != undefined) {
		that.get('bgEffectsArray').splice(y, 1);
	} else {
		that.get('bgEffectsArray').push(effect);
	}

	y = undefined;

	that.set('bgEffect', that.get('bgEffectsArray').join(" "));
	that.set('photoSection.bgClassNames', that.get('bgEffect'));
}


function attribute (attr, that) {
	return that.$('.textarea').css(attr);
}

function saveTextAttributes(that) {
	var fontType = attribute('font-family', that);
	var alignment = attribute('text-align', that);
	var textColor = attribute('color', that);
	var fontSize = attribute('font-size', that);
	var fontBold = attribute('font-weight', that);
	var fontItalic = attribute('font-style', that);
	var fontUnderline = attribute('text-decoration', that);

	that.set('photoSection.textEffects', {
		'font-family' : fontType, 
		'text-align' : alignment, 
		'color' : textColor, 
		'font-size' : fontSize, 
		'font-weight': fontBold, 
		'font-style' : fontItalic, 
		'text-decoration' : fontUnderline 
	});
}

function saveTextPositionAttribute(that) {
	var left = attribute('left', that);
	var top = attribute('top', that);
	var width = attribute('width', that);
	var height = attribute('height', that);

	that.set('photoSection.textPosition', {
		'left' : left, 
		'top' : top, 
		'width' : width, 
		'height' : height
	});
}


export default Ember.Component.extend({
	tagName: 'section',
	classNames: ['photo-section', 'clearfix'],

	effectsArray: null,
	bgEffectsArray: null,
	isMouseDown: false,
	defaultFont: 'Helvetica Neue',
	timeoutID: null,
	photoFileName: Ember.computed('photoSection.photoFileName', function() {
		return this.get('photoSection.photoFileName');
	}),

	photoRef(fileName, that) {
		var storage = that.get('firebaseApp').storage();
		var storageRef = storage.ref();
		var imagesRef = storageRef.child('images');

		return imagesRef.child(fileName);
	},

	display: false,
	firebaseApp: Ember.inject.service(),
	photoSectionText: Ember.computed('photoSection.text', function() {
		return this.get('photoSection.text');
	}),

	init() {
		this._super();
		this.set('effectsArray', []);
		this.set('bgEffectsArray', []);
		this.set('timeoutID', '');
	}, 

	testingText: function() {
		var that = this;

		var scrollHandler = function() {
			if (that.get('photoSection')) {
				if ($(window).scrollTop() > that.get('element.offsetTop') - $(window).height() && $(window).scrollTop() < that.get('element.offsetTop') + Math.max(that.get('element').getBoundingClientRect().height, $(window).height())) {
					that.set('effects', that.get('photoSection.photoClassNames'));
				} else {
					that.set('effects', '');
				}
			}
			
		};

		this.$(document).on('touchmove.scrollable', scrollHandler);
		this.$(window).on('scroll.scrollable', scrollHandler);
	}.on('didRender'),

	effects: Ember.computed('photoSection.photoClassNames', function() {

		if(this.get('photoSection.photoClassNames')) {
			this.set('effectsArray', []);
			this.set('effectsArray', this.get('photoSection.photoClassNames').split(" "));
		}

		return this.get('photoSection.photoClassNames');
	}),

	bgEffect: Ember.computed('photoSection.bgClassNames', function() {
		if (this.get('photoSection.bgClassNames')) {
			this.set('bgEffectsArray', []);
			this.set('bgEffectsArray', this.get('photoSection.bgClassNames').split(" "));
		}
		return this.get('photoSection.bgClassNames');
	}),


	status:	Ember.computed('photoSection.photoURL', function() {
		if (this.get('photoSection.photoURL.length') > 0) {
			return 'hidden';
		}
	}),

	optionsStatus:Ember.computed('photoSection.photoURL', function() {
		if (this.get('photoSection.photoURL.length') > 0) {
			return '';
		} else {
			return 'hidden';
		}
	}),

	onDisplayNot: Ember.computed('onDisplay', function() {
		if (this.get('onDisplay') !== 'hidden') {
			return 'hidden';
		}
	}),

	textDesired: Ember.computed('photoSection.text', function() {
		if (this.get('photoSection.text')) {
			return '';
		} else {
			return 'hidden';
		}

	}),


	didRender() {
		var ps = function(attr) {
			return 'photoSection.' + attr;
		};

		
		if (this.get(ps('textPosition'))) {
			this.$('.textForDisplay').css({
				top: this.get(ps('textPosition'))["top"],
				left: this.get(ps('textPosition'))["left"],
				width: this.get(ps('textPosition'))["width"],
				height: this.get(ps('textPosition'))["height"]
			});
		} else {
		
		}
	
		if (this.get(ps('textEffects'))) {
			this.$('.textForDisplay').css({
				color: this.get(ps('textEffects'))["color"],
				"font-family": this.get(ps('textEffects'))["font-family"],
				"font-size": this.get(ps('textEffects'))["font-size"],
				"font-style": this.get(ps('textEffects'))["font-style"],
				"font-weight": this.get(ps('textEffects'))["font-weight"],
				"text-align": this.get(ps('textEffects'))["text-align"],
				"text-decoration": this.get(ps('textEffects'))["text-decoration"]
			});
		}
		
		this.$('.textAreaSelectable').css({
			top:  parseFloat(this.$('.textForDisplay').css('top')) - 40,
			left:  parseFloat(this.$('.textForDisplay').css('left')) - 40,
			width:  parseFloat(this.$('.textForDisplay').css('width')) + 80,
			height:  parseFloat(this.$('.textForDisplay').css('height')) + 80
		});

	},

		actions: {
			upload() {
				var file = document.getElementById(this.get('photoSection.id')).files[0];
				var fileExt = file.name.split(".").get('lastObject').toLowerCase();
				var fileSizeMB = file.size / 1024 / 1024;

				if (( fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png' || fileExt === 'tiff' || fileExt === 'bmp' || fileExt === 'gif') && fileSizeMB <= 5 ) {
					var fileName = this.get('photoSection.id') + file.name;

					var photoRef = this.get('photoRef')(fileName, this);
					var fullPath = photoRef.fullPath;

					if (file !== undefined) {
						photoRef.put(file).then((snapshot) => {
						this.get('photoURL')(snapshot.downloadURL, fileName, this.get('photoSection').id);
						this.set('status', 'hidden');

					});
						file = undefined;
					}
				} else {
					alert('File type currently not supported or file size is too big ( > 5 MB )');
				}
			},

			changeEffectsWithBg(fgEffect, bgEffect) {
				changeEffects(fgEffect, this);
				changeBg(bgEffect, this);
			},

			setEffect(effect) {
				changeEffects(effect, this);
			},

			reset() {
				this.set('effectsArray', []);
				this.set('bgEffectsArray', []);
				this.set('bgEffect', this.get('bgEffectsArray').join(" "));
				this.set('effects', this.get('effectsArray').join(" "));
				this.set('photoSectionText', '');

			//database saving
			this.set('photoSection.bgClassNames', this.get('bgEffect'));
			this.set('photoSection.photoClassNames', this.get('effects'));
			this.set('photoSection.text', '');
		},

		mouseDown() {

			this.set('isMouseDown', true);	

		},

		mouseUp() {
			this.set('isMouseDown', false);
			saveTextPositionAttribute(this);

		},

		mouseMove() {

			if (this.get('isMouseDown') === true) {
				this.$('.textAreaSelectable').css({
					top: event.pageY - this.$('.textAreaSelectable').parent().offset().top - 20, left: event.clientX - this.$('.textAreaSelectable').width()/2
				});
				this.$('.textarea').css({
					top: event.pageY - this.$('.textAreaSelectable').parent().offset().top + 20, left: event.clientX - this.$('.textAreaSelectable').width()/2 + 40
				});

			}

		},

		inputText() {
			this.set('photoSection.text', this.get('photoSectionText'));
		},

		adjustSelectableSize() {
			this.$('.textAreaSelectable').css({
				width: this.$('.textarea').width() + 80 + 10,
				height: this.$('.textarea').height() + 80 + 10,
			});
			saveTextPositionAttribute(this);
		},

		previewFont(font) {
			this.set('defaultFont', this.$('.textarea').css("font-family").split(",")[0]);
			this.$('.textarea').css({
				"font-family": font
			});
		},

		unselectFont() {

			this.$('.textarea').css({
				"font-family": this.get('defaultFont')
			});

		},

		selectFont(font) {
			this.set('defaultFont', font);
			this.$('.textarea').css({
				"font-family": font
			});

			saveTextAttributes(this);

		},

		displayEditBar() {
			clearTimeout(this.get('timeoutID'));
			this.set('display', true);
		},

		undisplayEditBar() {
			this.set('timeoutID', setTimeout(() => {this.set('display', false);}, 500));
		},

		remainFocused() {
			this.$('textarea').focus();
		},

		fontSizeStyleActions(actionType) {
			var fontSize = parseFloat(this.$('textarea').css('font-size'));

			if (actionType === 'increaseFontSize') {
				this.$('textarea').css({
					"font-size": fontSize * 1.1
				});

			} else if (actionType === 'decreaseFontSize') {

				this.$('textarea').css({
					"font-size": fontSize * 0.9
				});

			} else if (actionType === 'boldFont') {
				var isBold = this.$('textarea').css('font-weight');

				if (isBold === 'bold') {
					this.$('textarea').css({
						'font-weight': 'normal'
					});
				} else {
					this.$('textarea').css({
						'font-weight': 'bold'
					});
				}

			} else if (actionType === 'italicFont') {
				var isItalic = this.$('textarea').css('font-style');

				if (isItalic === 'italic') {
					this.$('textarea').css({
						'font-style': 'normal'
					});
				} else {
					this.$('textarea').css({
						'font-style': 'italic'
					});
				}
			} else if (actionType === 'underlineFont') {
				var isUnderlined = this.$('textarea').css('text-decoration');

				if (isUnderlined === 'underline') {
					this.$('textarea').css({
						'text-decoration': 'none'
					});
				} else {
					this.$('textarea').css({
						'text-decoration': 'underline'
					});
				}
			} else if (actionType === 'alignLeft') {

				this.$('textarea').css({
					'text-align': 'left'
				});

			} else if (actionType === 'alignCenter') {

				this.$('textarea').css({
					'text-align': 'center'
				});

			} else if (actionType === 'alignRight') {

				this.$('textarea').css({
					'text-align': 'right'
				});

			} else if (actionType === 'alignJustify') {

				this.$('textarea').css({
					'text-align': 'justify'
				});

			}
			saveTextAttributes(this);
		},

		colorSelect(colorValue) {	
			this.$('textarea').css({
				color: colorValue
			});
			saveTextAttributes(this);
		},

		addTextField() {

			if (this.get('textDesired') !== 'hidden') {
				this.set('textDesired', 'hidden');
			} else {
				this.set('textDesired', '');
			}
		},

		save() {
			this.get('saveAttribute')(
				this.get('photoSection.id'), 
				this.get('photoSection.bgClassNames'), 
				this.get('photoSection.photoClassNames'), 
				this.get('photoSection.textPosition'), 
				this.get('photoSection.textEffects'),
				this.get('photoSection.text')
				);
		},

		deletePhoto() {
			var photoRef = this.get('photoRef')(this.get('photoFileName'), this);
			photoRef.delete().then(() => {
				alert('Photo was deleted!');
				this.get('deletePhoto')(this.get('photoSection.id'));
			}).catch((error) => {
  			// Uh-oh, an error occurred!
  		
  		});
		}
		//actions {}
	}
	
//component extend {}
});