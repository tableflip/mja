var keystone = require('keystone')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'projectcategories'

  ProjectCategory.model.find()
  .exec(function (err, categories) {
    if (err) console.error(err)

    locals.categories = categories
    view.render('projectcategories')
  })
}
