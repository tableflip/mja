var keystone = require('keystone')
var Bio = keystone.list('Bio')

exports = module.exports = function(req, res) {
  
  var locals = res.locals,
    view = new keystone.View(req, res)
  
  var slug = req.params.slug

  locals.bodyClass = 'about'

  Bio.model.find()
  .sort({'sortOrder': '1'})
  .exec(function (err, bios) {
    if (err) console.error(err)

    // Render the view
    locals.bios = bios

    view.render('about')
  });
  
}
