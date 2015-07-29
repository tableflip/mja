var keystone = require('keystone')
var ProfilePage = keystone.list('ProfilePage')

module.exports = function (req, res) {

  var locals = res.locals
  var view = new keystone.View(req, res)
  var slug = req.params.slug

  ProfilePage.model.findOne()
    .where({ 'slug': slug })
    .populate('category')
    .exec(render)

  function render (err, results) {
    if (err) {
      console.error(err)
      return view.render('500')
    }
    locals.bodyClass = 'profilepage'
    locals.profilePage = results.profilePage
    locals.nextPage = results.nextPage
    view.render('profilepage')
  }
}
