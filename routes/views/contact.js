var keystone = require('keystone');
var Page = keystone.list('Page');

exports = module.exports = function(req, res) {
  
  var locals = res.locals,
    view = new keystone.View(req, res);
  
  // Set locals
  locals.section = 'contact';

  Page.model.findOne({ name: 'Contact' }).exec(function (err, page) {
    if (err) console.error(err)

    // Render the view
    locals.page = page
    locals.bodyClass = 'contact'
    view.render('contact')
  });
  
}
