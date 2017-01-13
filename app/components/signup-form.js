import Ember from 'ember';

export default Ember.Component.extend({
	tagName: ['section'],
	classNames: ['signup-form'],
	emailValidMessage: null,
	emailErrorMessage: null,
	passwordValidMessage: null,
	passwordErrorMessage: null,
	confirmPasswordErrorMessage: null,
	confirmPasswordValidMessage: null,
	emailAddress: null,
	passwordTyped: null,
	confirmPasswordTyped: null,
	secondColumnDisabled: null,
	thirdColumnDisabled: null,

	init() {
	this._super();
	this.set('emailValidMessage', '');
	this.set('emailErrorMessage', '');
	this.set('passwordValidMessage', '');
	this.set('passwordErrorMessage', '');
	this.set('confirmPasswordErrorMessage', '');
	this.set('confirmPasswordValidMessage', '');
	this.set('emailAddress', '');
	this.set('passwordTyped', '');
	this.set('confirmPasswordTyped', '');
	this.set('secondColumnDisabled', true);
	this.set('thirdColumnDisabled', true);
	},

	
	emailValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),

	passwordValid: Ember.computed('passwordTyped', function() {
		if (this.get('passwordTyped').length >= 8) {
			return true;
		} else {
			return false;
		}

	}),

	confirmPasswordValid: Ember.computed('passwordTyped', 'confirmPasswordTyped', function() {
		
		if (this.get('passwordTyped') === this.get('confirmPasswordTyped')) {
			return true;
		} else {
			return false;
		}
	}),

	isValid: Ember.computed.and('emailValid', 'passwordValid', 'confirmPasswordValid'),
	isDisabled: Ember.computed.not('isValid'),

	isValidTwo: Ember.computed.and('emailValid', 'passwordValid', 'confirmPasswordValid', 'firstChecked', 'secondChecked', 'thirdChecked'),
	isDisabledTwo: Ember.computed.not('isValidTwo'),

	actions: {
		validateEmail() {
			var errorMessage;
			var validMessage;

			if (!this.get('emailValid')) {
				errorMessage = 'Email is invalid. Eg: example@exampleemail.com.';
				validMessage = '';
			} else {
				errorMessage = '';
				validMessage = 'Email is valid';
			}

			this.set('emailErrorMessage', errorMessage);
			this.set('emailValidMessage', validMessage);
		},

		validatePassword() {
			var errorMessage;
			var validMessage;

			if (!this.get('passwordValid')) {
				errorMessage = 'Password should have a minimum of 8 characters.';
				validMessage = '';
			} else {
				errorMessage = '';
				validMessage = 'Valid Password';
			}

			this.set('passwordErrorMessage', errorMessage);
			this.set('passwordValidMessage', validMessage);
		},

		validateConfirmPassword() {
			var errorMessage;
			var validMessage;

			if (!this.get('confirmPasswordValid')) {
				errorMessage = 'This password does not match given password.';
				validMessage = '';
			} else {
				errorMessage = '';
				validMessage = 'The "Next" button is Enabled. You can now move on to the next stage.';
			}

			this.set('confirmPasswordErrorMessage', errorMessage);
			this.set('confirmPasswordValidMessage', validMessage);
		},

		next(scale) {
			this.$().css({
				transform: `translate(${scale}, 0)`,
				transition: "transform 0.5s"
			});

			if (this.$().width() === this.$(document).width()) {
				this.$().css({
					'width': '300vw'
				});
			}

			if (this.get('secondColumnDisabled') === false) {
				this.set('thirdColumnDisabled', false);
				var timeoutID = window.setTimeout(() => {
					this.get('actions.transitionTo')(this);
				}, 3000);
			}

			this.set('secondColumnDisabled', false);

		},

		transitionTo(that) {
			that.get('transitionToExit')();
		}


	//actions closing bracket	
	}
}); // component extend closing bracket
