var keystone = require('keystone');
var HomepageUpdate = keystone.list('HomepageUpdate');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);
	
	// Set locals
	locals.section = 'home';

  HomepageUpdate.model.find().where({'published': true}).sort({ 'sortOrder': 1 }).exec(function (err, updates) {
    if (err) console.error(err)

    // Render the view
    locals.updates = updates
    locals.bodyClass = 'home'
    view.render('index')
  });
	
}
