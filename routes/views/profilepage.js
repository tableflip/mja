var keystone = require('keystone')
var ProfilePage = keystone.list('ProfilePage')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'profilepage'

  var slug = req.params.slug

  ProfilePage.model.findOne()
  .where({ 'slug': slug })
  .populate('category')
  .exec(function (err, profilePage) {
    if (err) console.error(err)

    locals.profilePage = profilePage
    view.render('profilepage')
  })
}
