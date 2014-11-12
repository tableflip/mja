var keystone = require('keystone')
var middleware = require('./middleware')
var importRoutes = keystone.importer(__dirname)

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	
	// Views
	app.get('/', routes.views.index)
  app.get('/projects', routes.views.projectcategories)
  app.get('/projects/:category', routes.views.projectcategory)
  app.get('/projects/:category/:slug', routes.views.project)
  app.get('/profile', routes.views.profilepages)
  app.get('/profile/clients', routes.views.clients)
  app.get('/profile/about', routes.views.about)
  app.get('/profile/affiliations-and-memberships', routes.views.affiliations)
  app.get('/profile/:slug', routes.views.profilepage)
  app.get('/contact', routes.views.contact)
	app.get('/updates/:slug', routes.views.homepageupdate)
	
}
