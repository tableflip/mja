var keystone = require('keystone')
var ProfilePage = keystone.list('ProfilePage')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'profilepages'

  ProfilePage.model.find()
  .exec(function (err, pages) {
    if (err) console.error(err)

    locals.pages = pages
    view.render('profilepages')
  })
}
