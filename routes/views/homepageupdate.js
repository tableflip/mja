var keystone = require('keystone')
var HomepageUpdate = keystone.list('HomepageUpdate')

exports = module.exports = function(req, res) {
  
  var locals = res.locals,
    view = new keystone.View(req, res)
  
  var slug = req.params.slug

  locals.bodyClass = 'homepageupdate'

  HomepageUpdate.model.find()
  .where({'published': true})
  .sort({'publishedDate': '-1'})
  .exec(function (err, updates) {
    if (err) console.error(err)

    // Render the view
    locals.updates = updates

    for (var i=0; i<updates.length; i++) {
      if (updates[i].slug === slug) {
        locals.selectedUpdate = updates[i]
        break
      }
    }

    view.render('homepageupdate')
  });
  
}
