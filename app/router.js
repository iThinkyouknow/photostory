import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('create');
  this.route('display', {path: '/display/:page_id'});
  this.route('done', {path: '/done/:page_id'});
});

export default Router;
