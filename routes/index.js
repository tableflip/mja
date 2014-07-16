var _ = require('underscore'),
	keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	
	// Views
	app.get('/', routes.views.index);
  app.get('/projects', routes.views.projectcategories);
  app.get('/projects/:category', routes.views.projects);
  app.get('/projects/:category/:slug', routes.views.project);
  app.get('/profile', routes.views.profile);
  app.get('/clients', routes.views.clients);
	app.get('/updates/:slug', routes.views.homepageupdate);
	
}
