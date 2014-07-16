var keystone = require('keystone')
var Project = keystone.list('Project')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'projects'

  var categoryTitle = req.params.category.toLowerCase()

  ProjectCategory.model.findOne()
  .where({title: categoryTitle})
  .exec(function (err, category) {

    Project.model.find()
    .where({'category': category})
    .sort({'publishedDate': '-1'})
    .exec(function (err, projects) {
      if (err) console.error(err)

      locals.projects = projects
      locals.category = category

      view.render('projects')
    })
  })
}
