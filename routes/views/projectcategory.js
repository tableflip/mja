var keystone = require('keystone')
var async = require('async')
var Project = keystone.list('Project')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'projects'

  var category = req.params.category

  async.waterfall(
    [
      function (cb) {
        ProjectCategory.model.findOne()
        .where({ slug: category })
        .exec(function (err, category) {
          cb(err, category)
        })
      },

      function (category, cb) {
        if (category === null) {
          cb(null, null)
        } else {
          locals.category = category

          Project.model.find()
          .where({ category: category._id })
          .exec(cb)
        }
      },
      
    ],

    function (err, projects) {
      if (err) {
        console.error(err)
        return view.render('errors/500')
      }
      if (projects === null) return view.render('errors/404')

      locals.projects = projects
      view.render('projectcategory')
    })
}
