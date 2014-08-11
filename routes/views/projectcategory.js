var keystone = require('keystone')
var async = require('async')
var Project = keystone.list('Project')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'projects'

  var category = req.params.category.toLowerCase()

  async.waterfall(
    [
      function (cb) {
        ProjectCategory.model.findOne()
        .where({ slug: category })
        .exec(function (err, category) {
          locals.category = category
          cb(err, category)
        })
      },

      function (category, cb) {
        Project.model.find()
        .where({ category: category._id })
        .exec(function (err, projects) {
          cb(err, projects)
        })
      },
      
    ],

    function (err, projects) {
      if (err) {
        console.error(err)
        return view.render('500')
      }

      locals.projects = projects
      view.render('projectcategory')
    })
}
